import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskForm } from '../task-form/task-form';
import { TaskItem } from '../task-item/task-item';
import { Task, TaskStatus } from '../app/models/task.model'; 
import * as TaskActions from '../app/store/tasks/task.actions';
import * as TaskSelectors from '../app/store/tasks/task.selectors';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskForm, TaskItem, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  filteredTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  selectedTask?: Task; 
  searchText: string = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.filteredTasks$ = this.store.select(TaskSelectors.selectTasks);
    this.loading$ = this.store.select(TaskSelectors.selectLoading);
    this.error$ = this.store.select(TaskSelectors.selectError);

    this.store.dispatch(TaskActions.loadTasks());
  }

  onDelete(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  onEdit(task: Task) {
    this.selectedTask = { ...task };
  }

  onTaskSaved() {
    this.selectedTask = undefined;
  }

  deleteAll() {
    this.store.dispatch(TaskActions.deleteAll());
  }

  getDoneTasksCount(tasks: Task[]): number {
    return tasks.filter(t => t.status === TaskStatus.Done).length;
  }

  filterTasks() {
    this.filteredTasks$ = this.store.select(
      TaskSelectors.selectTasks
    ).pipe(
      map(tasks =>
        tasks.filter(task =>
          task.title
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        )
      )
    );
  }

  onStatusChange(event: { id: string; status: number }){
    this.store.dispatch(TaskActions.updateTaskStatus({
    id: event.id,
    status: event.status
    }));
  }
}
