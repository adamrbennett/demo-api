export interface ILogConfig {
  level?: string
  logRequests?: boolean
}
export interface ISecurityConfig {
  cleanHeaders?: boolean
  cors?: ICorsConfig
}
export interface ICorsConfig {
  origin?: string | string[]
}
export interface IConfig {
  log?: ILogConfig
  security?: ISecurityConfig
}
