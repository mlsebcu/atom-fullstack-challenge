// ==================================================
// Archivo de constantes para la aplicación
// Contiene constantes relacionadas con la API
// rutas, mensajes de error, etc.
// ==================================================

// Constantes de localstorage
export const STORAGE_KEYS = {
  USER_ID: 'user_id',
  USER_EMAIL: 'user_email',
} as const;

// Constantes de mensajes de error
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Formato inválido para el correo electrónico',
  USER_NOT_FOUND: 'Usuario no encontrado',
  UNAUTHORIZED: 'No estás autorizado',
  NETWORK_ERROR: 'Error de red. Por favor, verifica tu conexión',
  SERVER_ERROR: 'Error del servidor. Por favor, inténtalo de nuevo más tarde',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo',
  INVALID_REQUEST: 'Solicitud inválida. Por favor, verifica los datos ingresados',
} as const;

// Constantes Autenticación
export const AUTH_MESSAGES = {
  NOT_AUTHENTICATED: 'Usuario no autenticado',
  ID_NOT_AVAILABLE: 'ID de usuario no disponible',
  LOGIN_ERROR: 'Error al iniciar sesión',
  CREATE_USER_ERROR: 'Error al crear la cuenta'
}

// Constantes Tareas
export const TASK_MESSAGES = {
  NOT_FOUND: 'Tarea no encontrada',
  DELETED_SUCCESS: 'Tarea eliminada exitosamente',
  DELETED_ERROR: 'Error al eliminar la tarea',
  CREATE_SUCCESS: 'Tarea creada exitosamente',
  CREATE_ERROR: 'Error al crear la tarea',
  UPDATE_SUCCESS: 'Tarea actualizada exitosamente',
  UPDATE_ERROR: 'Error al actualizar la tarea',
  LOAD_ERROR: 'Error al cargar las tareas',
  COMPLETED: 'Tarea marcada como completada',
  PENDING: 'Tarea marcada como pendiente',
}

// Duraciones para notificaciones (en milisegundos)
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;

// Constantes de rutas de la aplicación
export const ROUTE_PATHS = {
  LOGIN: '/login',
  TASKS: '/tasks',
  HOME: '/home',
  ABOUT: '/about',
} as const;
