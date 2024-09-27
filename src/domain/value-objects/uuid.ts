import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUID {
  private readonly _value: string;

  constructor() {
    const uuid = uuidv4();
    this._value = uuid;
  }

  public get value(): string {
    return this._value;
  }

  public static isValidUUID(value: string): boolean {
    return uuidValidate(value);
  }
}
