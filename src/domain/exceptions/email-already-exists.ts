import { ValidationException } from "./validation";

export class EmailAlreadyExistsException extends ValidationException {
  constructor() {
    super({ email: ["Email already exists."] });
  }
}
