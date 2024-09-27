export class Email {
  constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static validate(value: string): string[] {
    const errors: string[] = [];

    if (!value) {
      errors.push("Email cannot be empty");
    } else if (!Email.isValidEmail(value)) {
      errors.push("Invalid email format");
    }

    return errors;
  }

  public static create(value: string): Email {
    return new Email(value);
  }

  private static isValidEmail(value: string): boolean {
    return /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/.test(
      value
    );
  }
}
