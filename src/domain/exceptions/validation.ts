import { BaseException } from "./base";

export class ValidationException extends BaseException {
  constructor(errors: Record<string, string[]>) {
    super("Invalid input data.", errors);
  }
}
