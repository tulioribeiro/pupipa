import { compareSync, hashSync } from "bcrypt";

export class Password {
  #value: string;

  constructor(value: string) {
    try {
      const passwordHash = hashSync(value, 10);

      this.#value = passwordHash;
    } catch {
      throw new Error("Failed to hash password");
    }
  }

  static validate(value: string): string[] {
    const errors: string[] = [];

    if (!value) {
      errors.push("Password cannot be empty");
    } else if (value.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    return errors;
  }

  get value(): string {
    return this.#value;
  }

  compare(plainTextPassword: string): boolean {
    return compareSync(plainTextPassword, this.#value);
  }
}
