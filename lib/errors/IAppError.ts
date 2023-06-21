export interface IAppError extends Error {
  error: string
  statusCode?: number
  message: string
}
