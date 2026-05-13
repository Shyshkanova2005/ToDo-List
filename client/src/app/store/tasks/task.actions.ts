import { createAction, props} from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task] Load');

export const loadTasksSuccess = createAction(
  '[Task] Load Success',
  props<{ tasks: Task[] }>()
);

export const createTask = createAction(
    '[Task] Create',
    props<{ task: Task }>()
);

export const updateTask = createAction(
    '[Task] Update',
    props<{ task: Task }>()
);

export const updateTaskStatus = createAction(
  '[Task] Update Status',
  props<{ id: string; status: number }>()
);

export const deleteTask = createAction(
  '[Task] Delete',
  props<{ id: string }>()
);

export const taskError = createAction(
    '[Task] Error',
    props<{ error: string }>()
);

export const deleteAll = createAction(
    '[Task] Clear Tasks'
);

export const clearTasksSuccess = createAction(
  '[Task] Clear Tasks Success'
);