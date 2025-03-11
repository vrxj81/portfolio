import { handleHttpError } from './error-handler.util';
import { HttpErrorResponse } from '@angular/common/http';

describe('handleHttpError', () => {
  it('should handle HttpErrorResponse correctly', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    const result = handleHttpError(errorResponse);

    expect(result).toEqual({
      message: errorResponse.message,
      code: errorResponse.status,
      stack: errorResponse.statusText,
    });
  });

  it('should handle unknown error correctly', () => {
    const unknownError = new Error('Unknown error');

    const result = handleHttpError(unknownError);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      code: 500,
    });
  });

  it('should handle non-error objects correctly', () => {
    const result = handleHttpError('Some random string');

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      code: 500,
    });
  });

  it('should handle null error correctly', () => {
    const result = handleHttpError(null);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      code: 500,
    });
  });

  it('should handle undefined error correctly', () => {
    const result = handleHttpError(undefined);

    expect(result).toEqual({
      message: 'An unexpected error occurred',
      code: 500,
    });
  });
});
