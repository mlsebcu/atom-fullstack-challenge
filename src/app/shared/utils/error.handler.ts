import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../constants/app.constants';

export class ErrorHandler {
  static handleHttpError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    if (error.status === 401) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }

    if (error.status === 404) {
      return ERROR_MESSAGES.TASK_NOT_FOUND;
    }

    if (error.status >= 500) {
      return ERROR_MESSAGES.SERVER_ERROR;
    }

    return error.error?.message || ERROR_MESSAGES.INVALID_REQUEST;
  }

  static logError(error: unknown, context?: string): void {
    const timestamp = new Date().toISOString();
    const message = error instanceof Error ? error.message : String(error);
    const contextStr = context ? ` [${context}]` : '';

    console.error(`[${timestamp}]${contextStr}:`, message);
  }
}
