export class TodoDeleteFailIdNotFound extends Error {
  constructor(body: any) {
    super(body);
    this.body = body;
  }
  body: any;
}
