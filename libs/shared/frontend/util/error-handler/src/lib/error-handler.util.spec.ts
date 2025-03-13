import { handleHttpError } from './error-handler.util';
import { HttpErrorResponse } from '@angular/common/http';

describe('handleHttpError', () => {
  it('should handle HttpErrorResponse correctly', () => {
    const errorResponse = new HttpErrorResponse({
      error: { error: 'test 404 error', message: 'Not Found' },
      status: 404,
      statusText: 'Not Found',
    });

    const result = handleHttpError(errorResponse);

    expect(result).toEqual({
      error: 'test 404 error',
      message: 'Not Found',
      code: 404,
    });
  });

  it('should handle unknown error correctly', () => {
    const unknownError = new Error('Unknown error');

    const result = handleHttpError(unknownError);

    expect(result).toEqual({
      error: 'Internal Server Error',
      message: 'Unknown error',
      code: 500,
      stack: unknownError.stack,
    });
  });

  it('should handle non-error objects correctly', () => {
    const result = handleHttpError('Some random string');

    expect(result).toEqual({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      code: 500,
    });
  });

  it('should handle null error correctly', () => {
    const result = handleHttpError(null);

    expect(result).toEqual({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      code: 500,
    });
  });

  it('should handle undefined error correctly', () => {
    const result = handleHttpError(undefined);

    expect(result).toEqual({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      code: 500,
    });
  });
});
