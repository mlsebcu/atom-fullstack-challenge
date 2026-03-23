/**
 * Constantes de endpoints de la API
 * Este archivo centraliza todas las rutas de la API utilizadas en la aplicación.
 */

export const API_ENDPOINTS = {
  // Usuarios
  USERS: {
    GET_BY_EMAIL: (email: string) => `/users/${email}`,
    CREATE: '/users',
  },

  // Tareas
  TASKS: {
    GET_BY_USER: (userId: string) => `/tasks/user/${userId}`,
    CREATE: '/tasks',
    UPDATE: (taskId: string) => `/tasks/${taskId}`,
    DELETE: (taskId: string) => `/tasks/${taskId}`,
  },
} as const;