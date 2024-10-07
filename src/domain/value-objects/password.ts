import { compareSync, hashSync } from "bcrypt";

export class Password {
  #value: string;

  constructor(password: string, isHashed = false) {
    this.#value = isHashed ? password : hashSync(password, 10);
  }

  static create(password: string): Password {
    try {
      const passwordHash = hashSync(password, 10);

      return new Password(passwordHash);
    } catch {
      throw new Error("Failed to hash password.");
    }
  }

  static fromHash(hash: string): Password {
    return new Password(hash, true);
  }

  static validate(plainTextPassword: string): string[] {
    const errors: string[] = [];

    if (!plainTextPassword) {
      errors.push("Password cannot be empty");
    } else if (plainTextPassword.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    return errors;
  }

  get value(): string {
    return this.#value;
  }

  equals(plainTextPassword: string): boolean {
    return compareSync(plainTextPassword, this.#value);
  }
}
