export class Name {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  public static validate(value: string): string[] {
    const errors: string[] = [];

    if (!value) {
      errors.push("Name cannot be empty");
    } else if (!Name.isValidFullName(value)) {
      errors.push("Your name must be complete");
    }

    return errors;
  }

  private static isValidFullName(value: string): boolean {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+,?\s+[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(value);
  }

  get value(): string {
    return this._value;
  }
}
