interface ToResponse {
  error: string;
  message: string;
  details: Record<string, string[]>;
}

export class BaseException extends Error {
  public readonly details: Record<string, string[]>;

  constructor(message: string, details?: Record<string, string[]>) {
    super(message);
    this.name = this.constructor.name;
    this.details = details ?? {};
  }

  public toResponse(): ToResponse {
    return {
      error: this.name,
      message: this.message,
      details: this.details,
    };
  }
}
