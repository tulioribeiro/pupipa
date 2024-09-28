import { UUID } from "../value-objects/uuid";

export class BaseEntity {
  readonly #id: UUID;
  #createdAt: Date;
  #updatedAt?: Date;

  protected constructor() {
    this.#id = new UUID();
    this.#createdAt = new Date();
    this.#updatedAt = undefined;
  }

  get id(): string {
    return this.#id.value;
  }

  protected get _createdAt(): Date {
    return this.#createdAt;
  }

  protected get _updatedAt(): Date | undefined {
    return this.#updatedAt;
  }

  protected _updatedTimestamp(): void {
    this.#updatedAt = new Date();
  }
}
