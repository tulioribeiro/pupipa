import { BaseException, ToResponse } from "../../domain/exceptions/base";

interface ExceptionResponse {
  code: number;
  message: ToResponse;
}

export function handleException(error: unknown): ExceptionResponse {
  if (error instanceof BaseException) {
    return {
      code: error.statusCode,
      message: error.toResponse(),
    };
  }

  return {
    code: 500,
    message: {
      error: "InternalError",
      message: "Internal server error. Please try again later.",
      details: { error: ["An unexpected error occurred."] },
    },
  };
}
