import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUID {
  readonly #value: string;

  constructor(value?: string) {
    if (value && !uuidValidate(value)) {
      throw new Error("Invalid UUID.");
    }

    const uuid = value ?? uuidv4();
    this.#value = uuid;
  }

  get value(): string {
    return this.#value;
  }

  static isValidUUID(value: string): boolean {
    return uuidValidate(value);
  }

  static fromString(value: string): UUID {
    if (!uuidValidate(value)) {
      throw new Error("Invalid UUID.");
    }

    return new UUID(value);
  }
}
