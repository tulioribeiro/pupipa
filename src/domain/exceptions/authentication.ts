import { BaseException } from "./base";

export class AuthenticationException extends BaseException {
  constructor(message: string) {
    super({
      message,
      statusCode: 401,
    });
  }
}
