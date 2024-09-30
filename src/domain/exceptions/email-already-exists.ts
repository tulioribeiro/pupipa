export class EmailAlreadyExistsException extends Error {
  constructor() {
    super("A user with this already exists.");
    this.name = "EmailAlreadyExistsException";
  }
}
