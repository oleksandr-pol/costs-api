export class ClientError extends Error {
  constructor(statusCode, err) {
    super();
    this.statusCode = statusCode;
    this.message = err.message || 'client error';
    this.clientError = true;
  }
}
