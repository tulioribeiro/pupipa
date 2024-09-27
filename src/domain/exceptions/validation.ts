export class ValidationExecption extends Error {
  public readonly errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>) {
    super();
    this.name = "ValidationException";
    this.errors = errors;
  }
}
