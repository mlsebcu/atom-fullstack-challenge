import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<'pending' | 'completed'>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggleStatus(checked: boolean): void {
    const newStatus: 'pending' | 'completed' = checked ? 'completed' : 'pending';
    this.toggleStatus.emit(newStatus);
  }

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    if (confirm('¿Está seguro que desea eliminar esta tarea?')) {
      this.delete.emit();
    }
  }

  getFormattedDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('es-GT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  isCompleted(): boolean {
    return this.task.status === 'completed';
  }
}
