import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../app/models/task.model';
import { TaskStatus } from '../app/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  
@Input() task!: Task;
@Output() delete = new EventEmitter<string>();
@Output() edit = new EventEmitter<Task>();


getStatusText(status: number): string {
    switch (status) {
      case TaskStatus.Todo: return 'To Do';
      case TaskStatus.InProgress: return 'In Progress';
      case TaskStatus.Done: return 'Done';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case TaskStatus.Todo: return 'status-todo';
      case TaskStatus.InProgress: return 'status-progress';
      case TaskStatus.Done: return 'status-done';
      default: return '';
    }
  }

onDelete() {
  this.delete.emit(this.task.id!);
}

onEdit() {
  this.edit.emit(this.task);
}

}
