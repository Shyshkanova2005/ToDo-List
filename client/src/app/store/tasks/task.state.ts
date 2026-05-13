import { Task } from '../../models/task.model';

export interface TaskState{
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
};