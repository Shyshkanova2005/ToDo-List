import { taskReducer } from './task.reducer';
import { initialState } from "./task.state";
import * as TaskActions from './task.actions';
import { TaskStatus } from '../../models/task.model';

describe('TaskReducer', () => {
    it('should add task', () => {
        const task = {
          id: '1',
          title: 'Test Task',
          description: 'Description',
          status: TaskStatus.Todo,
          deadline: null
        };

        const action = TaskActions.loadTasksSuccess({ tasks: [task] });

        const state = taskReducer(initialState, action);

        expect(state.tasks.length).toBe(1);
        expect(state.tasks[0]).toEqual(task);
    });

    it('should set loading true', () => {
        const action = TaskActions.loadTasks();

        const state = taskReducer(initialState, action);

        expect(state.loading).toBe(true);
    });
});