import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  LoginFormComponent,
  LoginFormData,
} from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, MatSnackBarModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  @ViewChild(LoginFormComponent) loginFormComponent!: LoginFormComponent;
  
  isLoading = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.authService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.isLoading = state.loading;
        if (state.error) {
          this.showError(state.error);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Maneja el envío del formulario de login
   * Busca el usuario en el backend:
   * - Si existe: autentica y navega a tareas
   * - Si no existe: muestra diálogo para crear usuario
   */
  onLoginSubmit(formData: LoginFormData): void {
    // Validar que no sea null/undefined/vacio y que no haya un request en progreso
    if (!formData || !formData.email || formData.email.trim() === '' || this.isLoading) {
      return;
    }

    const email = formData.email.trim();
    this.authService
      .searchUser(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          // Si el usuario no existe (404), mostrar diálogo de creación
          if (error?.status === 404 || error?.statusCode === 404) {
            this.loginFormComponent?.openCreateUserDialog(email);
          } else {
            this.showError(error?.message || 'Error al iniciar sesión');
          }
        },
      });
  }

  /**
   * Maneja la creación de un nuevo usuario
   * Crea el usuario en el backend y lo autentica
   */
  onCreateUser(formData: LoginFormData): void {
    // Validar que no sea null/undefined/vacio y que no haya un request en progreso
    if (!formData || !formData.email || formData.email.trim() === '' || this.isLoading) {
      return;
    }

    const email = formData.email.trim();
    this.authService
      .createUser(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // El servicio maneja la autenticación y navegación
          this.showSuccess(`Cuenta creada exitosamente para ${email}`);
        },
        error: (error) => {
          this.showError(error?.message || 'Error al crear la cuenta');
        },
      });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
}
