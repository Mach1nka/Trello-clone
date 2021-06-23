class BadRequest {
  message: string;

  statusCode: number;

  errors: {
    message?: string;
    param?: string;
    location?: string;
  };

  constructor(errors = {}, message = 'Bad Request', statusCode = 400) {
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default BadRequest;
