import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

export const selectTaskstate = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
    selectTaskstate,
    state => state.tasks
);

export const selectLoading = createSelector(
    selectTaskstate,
    state => state.loading
);

export const selectError = createSelector(
    selectTaskstate,
    state => state.error
);