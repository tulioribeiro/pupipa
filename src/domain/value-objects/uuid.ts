import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUID {
  readonly #value: string;

  constructor() {
    const uuid = uuidv4();
    this.#value = uuid;
  }

  get value(): string {
    return this.#value;
  }

  static isValidUUID(value: string): boolean {
    return uuidValidate(value);
  }
}
