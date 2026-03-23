// ====================================
// Modelos de Usuario y Autenticación
// ====================================

export interface User {
  id: string;
  email: string;
  createdAt?: Date;
}

/**
 * Estado global de autenticación
 */
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
