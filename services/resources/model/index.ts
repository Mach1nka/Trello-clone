export interface BaseResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}
