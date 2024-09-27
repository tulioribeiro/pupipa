import { UUID } from "../value-objects/uuid";

export abstract class BaseEntity {
  private readonly _id: UUID;
  private _createdAt: Date;
  private _updatedAt?: Date;

  protected constructor() {
    this._id = new UUID();
    this._createdAt = new Date();
    this._updatedAt = undefined;
  }

  public get id(): string {
    return this._id.value;
  }

  protected get createdAt(): Date {
    return this._createdAt;
  }

  protected get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  protected _updatedTimestamp(): void {
    this._updatedAt = new Date();
  }
}
