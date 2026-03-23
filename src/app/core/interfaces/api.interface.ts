/**
 * Interfaces para las respuestas de la API
 * Este archivo define las interfaces genéricas para las respuestas de la API
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
