export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidTaskTitle(title: string): boolean {
    return !!(title && title.trim().length > 0 && title.length <= 255);
  }

  static isValidTaskDescription(description: string): boolean {
    return !!(description && description.length <= 1000);
  }

  static sanitizeInput(input: string): string {
    return input.trim();
  }
}
