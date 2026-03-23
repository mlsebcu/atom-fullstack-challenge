import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../../../core/services/http/http.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints.constant';
import { ErrorHandler } from '../../../shared/utils/error.handler';
import { CreateTaskRequest, Task, UpdateTaskRequest } from '../models/task.model';
import { ApiResponse } from '../../../core/interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSubject$ = new BehaviorSubject<Task[]>([]);

  readonly tasks$: Observable<Task[]> = this.tasksSubject$.asObservable();

  constructor(private httpService: HttpService) {}

  /**
   * Obtiene todas las tareas de un usuario
   * @param userId - ID del usuario
   * @returns Observable con las tareas del usuario
   */
  getTasks(userId: string): Observable<Task[]> {
    return this.httpService
      .get<ApiResponse<Task[]>>(API_ENDPOINTS.TASKS.GET_BY_USER(userId))
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          return [];
        }),
        tap((tasks) => {
          this.tasksSubject$.next(tasks);
        }),
        catchError((error) => {
          ErrorHandler.logError(error, 'TaskService.getTasks');
          return throwError(() => new Error(ErrorHandler.handleHttpError(error)));
        })
      );
  }

  /**
   * Crea una nueva tarea
   * @param request - Datos de la tarea a crear (userId, title, description)
   * @returns Observable con la tarea creada
   */
  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.httpService
      .post<ApiResponse<Task>>(API_ENDPOINTS.TASKS.CREATE, request)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          throw new Error('No task data in response');
        }),
        tap((task) => {
          const currentTasks = this.tasksSubject$.value;
          this.tasksSubject$.next([task, ...currentTasks]);
        }),
        catchError((error) => {
          ErrorHandler.logError(error, 'TaskService.createTask');
          return throwError(() => new Error(ErrorHandler.handleHttpError(error)));
        })
      );
  }

  /**
   * Actualiza una tarea existente
   * @param taskId - ID de la tarea a actualizar
   * @param request - Datos a actualizar (title, description, status)
   * @returns Observable con la tarea actualizada
   */
  updateTask(taskId: string, request: UpdateTaskRequest): Observable<Task> {
    return this.httpService
      .put<ApiResponse<Task>>(API_ENDPOINTS.TASKS.UPDATE(taskId), request)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return response.data;
          }
          throw new Error('No task data in response');
        }),
        tap((task) => {
          const currentTasks = this.tasksSubject$.value;
          const updatedTasks = currentTasks.map((t) =>
            t.id === taskId ? task : t
          );
          this.tasksSubject$.next(updatedTasks);
        }),
        catchError((error) => {
          ErrorHandler.logError(error, 'TaskService.updateTask');
          return throwError(() => new Error(ErrorHandler.handleHttpError(error)));
        })
      );
  }

  /**
   * Cambia el estado de una tarea entre pending y completed
   * @param taskId - ID de la tarea
   * @param status - Nuevo estado ('pending' o 'completed')
   * @returns Observable con la tarea actualizada
   */
  toggleTaskStatus(taskId: string, status: 'pending' | 'completed'): Observable<Task> {
    return this.updateTask(taskId, { status });
  }

  /**
   * Elimina una tarea
   * @param taskId - ID de la tarea a eliminar
   * @returns Observable que completa cuando se elimina
   */
  deleteTask(taskId: string): Observable<void> {
    return this.httpService
      .delete<ApiResponse<null>>(API_ENDPOINTS.TASKS.DELETE(taskId))
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(response.message || 'Error deleting task');
          }
          return;
        }),
        tap(() => {
          const currentTasks = this.tasksSubject$.value;
          const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
          this.tasksSubject$.next(filteredTasks);
        }),
        catchError((error) => {
          ErrorHandler.logError(error, 'TaskService.deleteTask');
          return throwError(() => new Error(ErrorHandler.handleHttpError(error)));
        })
      );
  }

  /**
   * Obtiene las tareas ordenadas por fecha de creación (descendente)
   * @returns Observable con las tareas ordenadas
   */
  getTasksSorted(): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) =>
        [...tasks].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      )
    );
  }

  /**
   * Obtiene una tarea por ID
   * @param taskId - ID de la tarea
   * @returns Observable con la tarea si existe
   */
  getTaskById(taskId: string): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map((tasks) => tasks.find((task) => task.id === taskId))
    );
  }
}
