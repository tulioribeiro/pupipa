interface ToResponse {
  error: string;
  message: string;
  details: Record<string, string[]>;
}

interface BaseExceptionProps {
  message?: string;
  statusCode?: number;
  details?: Record<string, string[]>;
}

class BaseException extends Error {
  public readonly details: Record<string, string[]>;
  public readonly statusCode: number;

  constructor({ message, details, statusCode }: BaseExceptionProps) {
    super(message ?? "Internal server error. Please try again later.");
    this.statusCode = statusCode ?? 500;
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

export { BaseException };
export type { ToResponse };
