type ClientError = "INVALID PARAMS" | "NO AUTH" | "LOGIN FAIL" | "SERVICE ERROR" | "REGISTER FAIL"

class CustomError extends Error {
  constructor(body: any) {
    super();
    this.body = body;
    this.clientError = "SERVICE ERROR"
  }
  body: any;
  clientError: ClientError;
}

//TODO: MOVE STATUS CODE TO BODY OF ERROR
export class TodoDeleteFailIdNotFound extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "INVALID PARAMS"
  }
}

export class LoginFail extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "LOGIN FAIL"
  }
}

export class AuthFailNoToken extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "NO AUTH"
  }
}

export class AuthFailTokenWrongFormat extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "NO AUTH"
  }
}

export class AuthFailNoContext extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "NO AUTH"
  }
}

export class AuthFailContextDoesntMatchRequest extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "NO AUTH"
  }
}

export class UserDeleteFailIdNotFound extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "INVALID PARAMS"
  }
}

export class RegisterFailOccupiedUsername extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "REGISTER FAIL"
  }
} 
export class EmptyForm extends CustomError {
  constructor(body: any) {
    super(body)
    this.clientError = "INVALID PARAMS"
  }
} 
