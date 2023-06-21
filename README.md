# Demo TypeScript API
> A TypeScript API for demonstration purposes

## Development

### Requirements

- Node 18+
- Docker
- Docker Compose

### Quick Start

Install dependencies:
```bash
npm install
```

Execute unit tests:
```bash
npm test
```

Execute unit tests in watch mode:
```bash
npm run tdd
```

Execute spec tests to verify the API conforms to its OpenAPI specification:
```bash
npm run test-spec
```

Execute benchmark tests to measure throughput:
```bash
npm run test-benchmark
```

Execute component tests to verify end-to-end behavior using mocked dependencies:
```bash
npm run test-component
```

Execute verification tests to verify end-to-end behavior against the deployed service:
```bash
npm run test-verification
```

Run the api in watch mode:
```bash
npm run watch
```

Run the api in a container in watch mode:
```bash
npm run compose-dev
```

Build the Docker image:
```bash
docker build -t demo-api .
```

## Setup a local Kubernetes cluster

### Requirements

- Minikube
- Kubectl
- Helm

### Quick Start

Start a minikube cluster:
```bash
minikube start --driver=docker --cpus='max' --memory='max'
```

Build the Docker image and load it into the minikube cluster:
```bash
docker build -t demo-api .
minikube image load demo-api
```

Install the Helm chart into the cluster:
```bash
helm install demo-api ./charts/demo-api -f ./charts/demo-api/values.yaml
```

Forward local port 3000 to the service's port 80:
```bash
kubectl port-forward svc/demo-api 3000:80
```

Make a request to the service in another terminal:
```bash
curl http://localhost:3000/api/echo
```