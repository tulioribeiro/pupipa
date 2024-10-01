export class Email {
  readonly #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  get value(): string {
    return this.#value;
  }

  static validate(value: string): string[] {
    const errors: string[] = [];

    if (!value) {
      errors.push("Email cannot be empty.");
    } else if (!this.#isValidEmail(value)) {
      errors.push("Invalid email format.");
    }

    return errors;
  }

  static create(value: string): Email {
    return new Email(value);
  }

  static #isValidEmail(value: string): boolean {
    return /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/.test(
      value
    );
  }
}
