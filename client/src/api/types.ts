export interface GetParams {
  url: string;
  params: string;
  headersConfig?: Headers;
}

export interface PostParams {
  url: string;
  data: any;
  headersConfig?: Headers;
}

export interface PutPatchDeleteParams {
  url: string;
  data: any;
}

export interface ErrorParams {
  error: string;
  errorInfo: string;
}
