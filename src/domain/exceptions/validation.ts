import { BaseException } from "./base";

interface ValidationExceptionProps {
  errors?: Record<string, string[]>;
  statusCode?: number;
  message?: string;
}

export class ValidationException extends BaseException {
  constructor({ errors, statusCode, message }: ValidationExceptionProps) {
    super({
      message: message ?? "Invalid input data.",
      details: errors,
      statusCode: statusCode ?? 400,
    });
  }
}
