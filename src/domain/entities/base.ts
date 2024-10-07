import { UUID } from "../value-objects/uuid";

export class BaseEntity {
  readonly #id: UUID;
  #createdAt: Date;
  #updatedAt: Date | null;

  protected constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.#id = new UUID(id);
    this.#createdAt = createdAt ?? new Date();
    this.#updatedAt = updatedAt ?? null;
  }

  get id(): string {
    return this.#id.value;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date | null {
    return this.#updatedAt;
  }

  protected _updatedTimestamp(): void {
    this.#updatedAt = new Date();
  }
}
