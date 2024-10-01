export class Name {
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
      errors.push("Name cannot be empty.");
    } else if (!this.#isValidFullName(value)) {
      errors.push("Your name must be complete.");
    }

    return errors;
  }

  static #isValidFullName(value: string): boolean {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+,?\s+[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(value);
  }
}
