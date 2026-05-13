import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../app/models/task.model';
import * as TaskActions from '../app/store/tasks/task.actions';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnChanges {

  TaskStatus = TaskStatus;
  error$!: any;
  minDate: Date = new Date()

  constructor(private store: Store) {
     this.error$ = this.store.select(
      (state: any) => state.tasks.error
    );
    this.minDate.setHours(0, 0, 0, 0);
  }
  
  @Input() task?: Task;
  @Output() saved = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  deadline: any = null;
  status: TaskStatus = TaskStatus.Todo;

  ngOnChanges() {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description || '';
      this.status = this.task.status;
      this.deadline = this.task.deadline ? new Date(this.task.deadline) : null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.minDate = today;

  } else {
    this.minDate = null as any;
  }
  }

  saveTask() {

    let finalDeadline: string | null = null;

    if (this.deadline) {
    const d = new Date(this.deadline);
    d.setHours(23, 59, 59, 999);
    finalDeadline = d.toISOString();
  }
  
    const taskToSend: Task = {
      title: this.title,
      description: this.description || null,
      status: Number(this.status),
      deadline: finalDeadline
    };


    if (this.task?.id) {
      taskToSend.id = this.task.id;
      this.store.dispatch(TaskActions.updateTask({ task: taskToSend }));
    } else {
      this.store.dispatch(TaskActions.createTask({ task: taskToSend }));
    }

    this.saved.emit();
    this.clearForm();
  }

  clearForm() {
    this.title = '';
    this.description = '';
    this.deadline = null;
    this.status = TaskStatus.Todo;
    this.task = undefined;
  }
}