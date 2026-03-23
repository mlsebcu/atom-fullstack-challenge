import { STORAGE_KEYS } from "../constants/app.constants";

export class StorageManager {
  /**
   * Guarda los datos del usuario autenticado
   */
  static setUser(userId: string, email: string): void {
    sessionStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    sessionStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
  }

  /**
   * Obtiene los datos del usuario autenticado
   */
  static getUser(): { id: string; email: string } | null {
    const userId = sessionStorage.getItem(STORAGE_KEYS.USER_ID);
    const email = sessionStorage.getItem(STORAGE_KEYS.USER_EMAIL);

    if (!userId || !email) {
      return null;
    }

    return { id: userId, email };
  }

  /**
   * Elimina los datos del usuario
   */
  static removeUser(): void {
    sessionStorage.removeItem(STORAGE_KEYS.USER_ID);
    sessionStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
  }

  /**
   * Limpia todo el sessionStorage
   */
  static clear(): void {
    sessionStorage.clear();
  }

  /**
   * Verifica si hay un usuario autenticado
   */
  static isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

}