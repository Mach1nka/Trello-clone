export interface GetParams {
  url: string;
  params: string;
  headersConfig?: Headers;
}

export interface CRUDParams<T> {
  url: string;
  data: T;
  headersConfig?: Headers;
}

export interface ErrorParams {
  error: string;
  errorInfo: string;
}
