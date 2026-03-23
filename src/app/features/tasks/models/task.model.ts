// ============================
// Interfaces para tareas
// ============================

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  userId: string;
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
}

export interface TasksResponse {
  data: Task[];
  total: number;
}

export interface TaskFormData {
  title: string;
  description: string;
}
