import { createReducer, on } from '@ngrx/store';
import { initialState } from "./task.state";
import * as TaskActions from './task.actions';

export const taskReducer = createReducer(

  initialState,

  on(TaskActions.createTask, TaskActions.updateTask, TaskActions.deleteTask, (state) => ({
    ...state,
    error: null,
    loading: true
  })),
  
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true, 
    error: null
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null
  })),

  on(TaskActions.taskError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(TaskActions.deleteAll, (state) => ({
  ...state,
  tasks: []
})),

on(TaskActions.clearTasksSuccess, (state) => ({
  ...state,
  tasks: []
}))
)