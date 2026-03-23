import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../../shared/utils/error.handler';

/**
 * Opciones para peticiones HTTP
 */
export interface HttpOptions {
  params?: HttpParams | Record<string, string | number | boolean>;
  retry?: number;
  timeout?: number;
}

/**
 * Servicio HTTP para manejar peticiones
 * Proporciona métodos GET, POST, PUT, DELETE con manejo centralizado de errores
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = environment.apiUrl;
  private readonly defaultRetries = environment.http.defaultRetries;
  private readonly defaultTimeout = environment.http.defaultTimeout;

  constructor(private http: HttpClient) {}

  /**
   * GET - Obtener recursos
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return this.http.get<T>(url, httpOptions).pipe(
      retry(options?.retry ?? this.defaultRetries),
      timeout(options?.timeout ?? this.defaultTimeout),
      catchError((error: any) => this.handleError(error))
    );
  }

  /**
   * POST - Crear nuevos recursos
   */
  post<T>(
    endpoint: string,
    body: unknown,
    options?: HttpOptions
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return this.http.post<T>(url, body, httpOptions).pipe(
      retry(options?.retry ?? 0),
      timeout(options?.timeout ?? this.defaultTimeout),
      catchError((error: any) => this.handleError(error))
    );
  }

  /**
   * PUT - Reemplazar un recurso
   */
  put<T>(
    endpoint: string,
    body: unknown,
    options?: HttpOptions
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return this.http.put<T>(url, body, httpOptions).pipe(
      retry(options?.retry ?? 0),
      timeout(options?.timeout ?? this.defaultTimeout),
      catchError((error: any) => this.handleError(error))
    );
  }

  /**
   * DELETE - Eliminar un recurso
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    const httpOptions = this.buildHttpOptions(options);

    return this.http.delete<T>(url, httpOptions).pipe(
      retry(options?.retry ?? 0),
      timeout(options?.timeout ?? this.defaultTimeout),
      catchError((error: any) => this.handleError(error))
    );
  }

  /**
   * Construye la URL completa
   */
  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${this.baseUrl}/${cleanEndpoint}`;
  }

  /**
   * Construye opciones HTTP
   */
  private buildHttpOptions(options?: HttpOptions): {
    params?: HttpParams;
  } {
    const httpOptions: {
      params?: HttpParams;
    } = {};

    if (options?.params) {
      httpOptions.params =
        options.params instanceof HttpParams
          ? options.params
          : new HttpParams({ fromObject: options.params as any });
    }

    return httpOptions;
  }

  /**
   * Maneja errores HTTP
   */
  private handleError(error: HttpErrorResponse | TimeoutError) {
    if (error instanceof TimeoutError) {
      ErrorHandler.logError('Request timeout', 'HttpService');
      return throwError(() => ({
        status: 408,
        message: 'Request timeout',
      }));
    }

    const errorMessage = ErrorHandler.handleHttpError(error as HttpErrorResponse);
    ErrorHandler.logError(
      {
        status: (error as HttpErrorResponse).status,
        message: errorMessage,
        url: (error as HttpErrorResponse).url,
      },
      'HttpService'
    );

    return throwError(() => ({
      status: (error as HttpErrorResponse).status,
      message: errorMessage,
    }));
  }
}
