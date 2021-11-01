export interface GetParams {
  url: string;
  params: string;
}

export interface CRUDParams<T> {
  url: string;
  data: T;
}

export interface ErrorParams {
  error: string;
  errorInfo: string;
}
