const requestHeader = (authToken?: string): Headers => {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  if (authToken) {
    headers.set('Authorization', authToken);
  }

  return headers;
};

const responseHandler = (resp: Response): Promise<Response> => resp.json();

export { requestHeader, responseHandler };
