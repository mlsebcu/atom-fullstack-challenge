import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() loading = false;
  @Output() taskToggled = new EventEmitter<{ taskId: string; status: 'pending' | 'completed' }>();
  @Output() taskEdited = new EventEmitter<string>();
  @Output() taskDeleted = new EventEmitter<string>();

  trackByTaskId: (index: number, task: Task) => string = (_, task) => task.id;

  onToggleTask(taskId: string, status: 'pending' | 'completed'): void {
    this.taskToggled.emit({ taskId, status });
  }

  onEditTask(taskId: string): void {
    this.taskEdited.emit(taskId);
  }

  onDeleteTask(taskId: string): void {
    this.taskDeleted.emit(taskId);
  }
}
