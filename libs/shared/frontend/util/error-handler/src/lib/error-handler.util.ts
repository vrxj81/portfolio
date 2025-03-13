import { HttpErrorResponse } from '@angular/common/http';
import { IError } from '@portfolio/common-models';

export const handleHttpError = (error: unknown): IError => {
  if (error instanceof HttpErrorResponse) {
    return {
      error: error.error.error,
      message: error.error.message,
      code: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      error: 'Internal Server Error',
      message: error.message,
      code: 500,
      stack: error.stack,
    };
  }

  return {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    code: 500,
  };
};
