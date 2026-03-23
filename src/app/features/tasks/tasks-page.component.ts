import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFormData,
} from './models/task.model';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthService } from '../auth/services/auth.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    TaskFormComponent,
    TaskListComponent,
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss',
})
export class TasksPageComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading = false;
  private userId: string | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Obtener el userId del servicio de autenticación
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadTasks();
    } else {
      this.showError('Usuario no autenticado');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTasks(): void {
    if (!this.userId) {
      this.showError('ID de usuario no disponible');
      return;
    }

    this.loading = true;
    this.taskService
      .getTasks(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.showError('Error al cargar las tareas');
        },
      });
  }

  onTaskSubmitted(formData: any): void {
    if (!this.userId) {
      this.showError('ID de usuario no disponible');
      return;
    }

    // Agregar userId al request
    const request: CreateTaskRequest = {
      userId: this.userId,
      title: formData.title,
      description: formData.description,
    };

    this.taskService
      .createTask(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newTask) => {
          this.tasks = [newTask, ...this.tasks];
          this.showSuccess('Tarea creada exitosamente');
        },
        error: () => {
          this.showError('Error al crear la tarea');
        },
      });
  }

  onTaskToggled(event: {
    taskId: string;
    status: 'pending' | 'completed';
  }): void {
    this.taskService
      .toggleTaskStatus(event.taskId, event.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          );
          const message =
            event.status === 'completed'
              ? 'Tarea marcada como completada'
              : 'Tarea marcada como pendiente';
          this.showSuccess(message);
        },
        error: () => {
          this.showError('Error al actualizar la tarea');
        },
      });
  }

  onTaskDeleted(taskId: string): void {
    this.taskService
      .deleteTask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
          this.showSuccess('Tarea eliminada exitosamente');
        },
        error: () => {
          this.showError('Error al eliminar la tarea');
        },
      });
  }

  onTaskEdited(taskId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) {
      this.showError('Tarea no encontrada');
      return;
    }

    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
    });

    const formComponent = dialogRef.componentInstance;
    formComponent.initialData = {
      title: task.title,
      description: task.description,
    };
    formComponent.isEditMode = true;

    // Listener para cancelar
    formComponent.cancelled.pipe(takeUntil(this.destroy$)).subscribe(() => {
      dialogRef.close();
    });

    formComponent.taskSubmitted
      .pipe(takeUntil(this.destroy$))
      .subscribe((formData: TaskFormData) => {
        const updateRequest: UpdateTaskRequest = {
          title: formData.title,
          description: formData.description,
        };

        this.taskService
          .updateTask(taskId, updateRequest)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (updatedTask) => {
              this.tasks = this.tasks.map((t) =>
                t.id === taskId ? updatedTask : t,
              );
              this.showSuccess('Tarea actualizada exitosamente');
              dialogRef.close();
            },
            error: () => {
              this.showError('Error al actualizar la tarea');
            },
          });
      });
  }

  onAbout(): void {
    this.router.navigate(['/about']);
  }

  onLogout(): void {
    this.authService.logout();
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
