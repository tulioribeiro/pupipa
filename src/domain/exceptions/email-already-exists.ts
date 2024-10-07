import { ValidationException } from "./validation";

export class EmailAlreadyExistsException extends ValidationException {
  constructor() {
    super({
      errors: { email: ["Email already exists."] },
      statusCode: 409,
    });
  }
}
