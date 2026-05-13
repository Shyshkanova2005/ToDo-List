import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {

  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  private extractErrorMessage(error: any): string {

  if (Array.isArray(error?.error)) {
    return error.error.join(', ');
  }

  if (error?.error?.errors) {

    const errors = error.error.errors;

    const messages: string[] = [];

    Object.keys(errors).forEach(key => {
      messages.push(...errors[key]);
    });

    return messages.join(', ');
  }

  if (typeof error?.error === 'string') {
    return error.error;
  }

  return 'Server error';
}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(() => of(TaskActions.taskError({ error: 'Failed to sync with server' })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TaskActions.createTask),
    mergeMap(action =>
      this.taskService.createTask(action.task).pipe(
        map(() => TaskActions.loadTasks()),
        catchError(error => of(TaskActions.taskError({ error: this.extractErrorMessage(error) })))
      )
    )
  )
);

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map(() => TaskActions.loadTasks()),
          catchError(error => of(TaskActions.taskError({ error: this.extractErrorMessage(error) })))
        )
      )
    )
  );

  updateTaskStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTaskStatus),
      mergeMap(action =>
        this.taskService.updateTaskStatus(action.id, action.status).pipe(
          map(() => TaskActions.loadTasks()),
          catchError(error => of(TaskActions.taskError({ error: this.extractErrorMessage(error) })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(action =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => TaskActions.loadTasks()),
          catchError(() => of(TaskActions.taskError({ error: 'Failed to delete task' })))
        )
      )
    )
  );

  deleteAllTasks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.deleteAll),
      mergeMap(() =>
      this.taskService.deleteAllTasks().pipe(
        map(() => TaskActions.clearTasksSuccess())
      )
    )
  )
);

}