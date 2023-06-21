# begin multi-stage build with a build stage
FROM node:18 as build

# define a build argument for the app directory
ARG APP_DIR=/opt/app

# set the current directory to the app directory
WORKDIR $APP_DIR

# create a layer containing the node modules
# this layer will be cached and node modules will not need to be
# downloaded every build unless package.json or package-lock.json change
COPY package.json package-lock.json $APP_DIR/
RUN npm ci

# copy the source into the app directory
COPY . $APP_DIR

# build the app
RUN npm run build && npm run build-docs

# remove and reinstall only production node modules
RUN rm -rf node_modules && \
  npm ci --production

# final stage
FROM node:18

# define a build argument for the app directory
ARG APP_DIR=/opt/app

# set the current directory to the app directory
WORKDIR $APP_DIR

# copy built assets from the build stage
COPY --from=build $APP_DIR/dist $APP_DIR/dist
COPY --from=build $APP_DIR/config $APP_DIR/config
COPY --from=build $APP_DIR/spec $APP_DIR/spec
COPY --from=build $APP_DIR/docs $APP_DIR/docs
COPY --from=build $APP_DIR/test/verification/collection.json $APP_DIR/postman.json
COPY --from=build $APP_DIR/node_modules $APP_DIR/node_modules
COPY --from=build $APP_DIR/package.json $APP_DIR/package.json

# get the build number as a build argument at build time,
# and set it as an environment variable for access at run time
ARG BUILD_NUMBER
ENV BUILD_NUMBER ${BUILD_NUMBER}

# get the commit hash as a build argument at build time
# and set it as an environment variable for access at run time
ARG COMMIT_HASH
ENV COMMIT_HASH ${COMMIT_HASH}

# export port 3000
EXPOSE 3000

# set the runtime user
USER node

# start the app when the container runs
ENTRYPOINT ["npm", "start"]
