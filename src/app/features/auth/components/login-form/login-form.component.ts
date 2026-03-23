import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface LoginFormData {
  email: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  @Input() loading = false;
  @Output() submit = new EventEmitter<LoginFormData>();
  @Output() createUser = new EventEmitter<LoginFormData>();

  form: FormGroup;
  showCreateUserDialog = false;
  pendingEmail: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Resetear el formulario cuando se carga el componente
    this.form.reset();
  }

  get email() {
    return this.form.get('email');
  }

  /**
   * Maneja el envío del formulario de login.
   * Valida el formulario y emite el evento de submit con los datos del formulario.
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.form.getRawValue() as { email: string };
    const email = formValue?.email;
    
    // Validar que el email existe y no es undefined
    if (!email || typeof email !== 'string') {
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail === '') {
      return;
    }

    this.submit.emit({ email: trimmedEmail });
  }

  /**
   * Maneja la confirmación de creación de usuario.
   * Emite el evento de createUser con el email pendiente
   * y cierra el diálogo de creación de usuario.
   */
  onCreateUserConfirm(): void {
    if (this.pendingEmail) {
      this.createUser.emit({ email: this.pendingEmail });
      this.showCreateUserDialog = false;
      this.pendingEmail = null;
    }
  }

  /**
   * Maneja la cancelación de creación de usuario.
   * Cierra el diálogo de creación de usuario y limpia el email pendiente.
   * No emite ningún evento ya que el usuario ha decidido no crear una cuenta.
   */
  onCreateUserCancel(): void {
    this.showCreateUserDialog = false;
    this.pendingEmail = null;
  }

  /**
   * Abre el diálogo de creación de usuario con el email proporcionado.
   * Almacena el email en pendingEmail para su uso posterior en la confirmación de creación de usuario.
   * @param email correo electrónico
   */
  openCreateUserDialog(email: string): void {
    this.pendingEmail = email;
    this.showCreateUserDialog = true;
  }

  /**
   * Marca todos los controles del grupo de formulario
   * @param formGroup grupo de formulario
   */
  private markFormGroupTouched(formGroup: FormGroup = this.form): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
