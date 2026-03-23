import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../../../core/services/http/http.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constant';
import { StorageManager } from '../../../shared/utils/storage.manager';
import { ErrorHandler } from '../../../shared/utils/error.handler';
import { User, AuthState } from '../models/user.model';
import { ApiResponse } from '../../../core/interfaces/api.interface';
import { ROUTE_PATHS } from '../../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authState$ = new BehaviorSubject<AuthState>({
    user: StorageManager.getUser(),
    loading: false,
    error: null,
  });

  readonly authState: Observable<AuthState> = this.authState$.asObservable();
  readonly isAuthenticated$: Observable<boolean> = this.authState$.pipe(
    map((state) => state.user !== null),
  );
  readonly user$: Observable<User | null> = this.authState$.pipe(
    map((state) => state.user),
  );

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  /**
   * Busca un usuario por email
   * @param email - Email del usuario a buscar
   * @returns Observable con el usuario si existe
   */
  searchUser(email: string): Observable<User> {
    // Validar que el email no sea undefined/null/vacio
    if (!email || typeof email !== 'string' || email.trim() === '') {
      const errorMsg = 'Email es requerido y debe ser válido';
      this.updateAuthState({ loading: false, error: errorMsg });
      return throwError(() => new Error(errorMsg));
    }

    this.updateAuthState({ loading: true, error: null });

    return this.httpService
      .get<ApiResponse<User>>(API_ENDPOINTS.USERS.GET_BY_EMAIL(email.trim()), { retry: 0 })
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          throw new Error('No user data in response');
        }),
        tap((user) => {
          this.setUser(user);
          this.updateAuthState({ loading: false });
        }),
        catchError((error) => {
          const errorMessage = ErrorHandler.handleHttpError(error);
          this.updateAuthState({ loading: false, error: errorMessage });
          return throwError(() => error);
        }),
      );
  }

  /**
   * Crea un nuevo usuario
   * @param email - Email del usuario a crear
   * @returns Observable con el usuario creado
   */
  createUser(email: string): Observable<User> {
    // Validar que el email no sea undefined/null/vacio
    if (!email || typeof email !== 'string' || email.trim() === '') {
      const errorMsg = 'Email es requerido y debe ser válido';
      this.updateAuthState({ loading: false, error: errorMsg });
      return throwError(() => new Error(errorMsg));
    }

    this.updateAuthState({ loading: true, error: null });

    return this.httpService
      .post<ApiResponse<User>>(API_ENDPOINTS.USERS.CREATE, { email: email.trim() }, { retry: 0 })
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          throw new Error('No user data in response');
        }),
        tap((user) => {
          this.setUser(user);
          this.updateAuthState({ loading: false });
        }),
        catchError((error) => {
          const errorMessage = ErrorHandler.handleHttpError(error);
          this.updateAuthState({ loading: false, error: errorMessage });
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    StorageManager.removeUser();
    this.updateAuthState({
      user: null,
      loading: false,
      error: null,
    });
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }

  private setUser(user: User): void {
    StorageManager.setUser(user.id, user.email);

    this.updateAuthState({
      user: { id: user.id, email: user.email },
      loading: false,
      error: null,
    });

    this.router.navigate([ROUTE_PATHS.TASKS]);
  }

  private updateAuthState(partial: Partial<AuthState>): void {
    const currentState = this.authState$.value;
    this.authState$.next({ ...currentState, ...partial });
  }

  getCurrentUser(): User | null {
    return StorageManager.getUser();
  }
}
