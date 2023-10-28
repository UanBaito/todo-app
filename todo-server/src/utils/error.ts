//TODO: move client error to the body of these classes
type ClientError = "INVALID PARAMS" | "NO_AUTH" | "LOGIN FAIL" | "SERVICE ERROR"

class CustomError extends Error {
  constructor(body: any) {
    super();
    this.body = body;
    this.clientError = "SERVICE ERROR"
  }
  body: any;
  clientError: ClientError;
}


export class TodoDeleteFailIdNotFound extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "INVALID PARAMS"
  }
}

export class LoginFail extends CustomError {
}
