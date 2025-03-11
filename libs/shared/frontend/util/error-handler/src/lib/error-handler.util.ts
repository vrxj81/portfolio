import { HttpErrorResponse } from '@angular/common/http';
import { IError } from '@portfolio/common-models';

export const handleHttpError = (error: unknown): IError => {
  if (error instanceof HttpErrorResponse) {
    return {
      message: error.message,
      code: error.status,
      stack: error.statusText,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 500,
  };
};
