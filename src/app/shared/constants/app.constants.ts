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

// Constantes de Status Code de HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Constantes de mensajes de error
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Formato inválido para el correo electrónico',
  USER_NOT_FOUND: 'Usuario no encontrado',
  UNAUTHORIZED: 'No estás autorizado',
  NETWORK_ERROR: 'Error de red. Por favor, verifica tu conexión',
  SERVER_ERROR: 'Error del servidor. Por favor, inténtalo de nuevo más tarde',
  TASK_NOT_FOUND: 'Tarea no encontrada',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo',
  INVALID_REQUEST: 'Solicitud inválida. Por favor, verifica los datos ingresados',
} as const;

// Constantes de mensajes de respuestas exitosas
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Bienvenido de nuevo!',
  ACCOUNT_CREATED: 'Cuenta creada con éxito',
  TASK_CREATED: 'Tarea creada correctamente',
  TASK_UPDATED: 'Tarea actualizada correctamente',
  TASK_DELETED: 'Tarea eliminada correctamente',
  TASK_COMPLETED: 'Tarea marcada como completada',
} as const;

// Validaciones y reglas
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  TASK_TITLE_MIN_LENGTH: 1,
  TASK_TITLE_MAX_LENGTH: 255,
  TASK_DESCRIPTION_MAX_LENGTH: 1000,
} as const;

// Toast/Snackbar Durations (ms)
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;

// Constantes de rutas de la aplicación
export const ROUTE_PATHS = {
  ROOT: '',
  LOGIN: '/login',
  TASKS: '/tasks',
  HOME: '/home',
  WILDCARD: '**',
} as const;
