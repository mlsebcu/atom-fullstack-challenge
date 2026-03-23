import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageManager } from '../../shared/utils/storage.manager';
import { ROUTE_PATHS } from '../../shared/constants/app.constants';

/**
 * Guard que protege rutas privadas, requiere correo válido
 * Bloquea acceso si el usuario NO está autenticado
 */
export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (StorageManager.isAuthenticated()) {
    return true;
  }

  return router.navigate([ROUTE_PATHS.LOGIN]);
};

/**
 * Guard que protege la ruta de login cuando no está logueado
 * Bloquea acceso si el usuario ya está autenticado
 */
export const LoginGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (!StorageManager.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([ROUTE_PATHS.TASKS]);
};
