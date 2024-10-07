import { BaseException } from "./base";

export class ResourceNotFoundException extends BaseException {
  constructor() {
    super({
      message: "Resource not found.",
      statusCode: 404,
    });
  }
}
