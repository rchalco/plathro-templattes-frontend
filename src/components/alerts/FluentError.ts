export interface AxiosErrorDetails {
  message: string
  name: string
  stack: string
  config: {
    transitional: {
      silentJSONParsing: boolean
      forcedJSONParsing: boolean
      clarifyTimeoutError: boolean
    }
    adapter: string[]
    transformRequest: (null | unknown)[]
    transformResponse: (null | unknown)[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Record<string, unknown>
    headers: {
      Accept: string
      'Content-Type': string
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Methods': string
    }
    baseURL: string
    method: string
    url: string
    data: string
    allowAbsoluteUrls: boolean
  }
  code: string
  status: number
  response: {
    data: {
      reasons: []
      message: string
    }
  }
}
