class BaseResponse {
  statusCode: number;

  data: any;

  constructor(data = {}, statusCode = 200) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default BaseResponse;
