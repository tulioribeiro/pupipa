import { BaseException } from "./base";

export class ValidationException extends BaseException {
  constructor(errors: Record<string, string[]>, statusCode?: number) {
    super({
      message: "Invalid input data.",
      details: errors,
      statusCode: statusCode ?? 400,
    });
  }
}
