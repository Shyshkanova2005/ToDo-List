export interface Task {
    id?: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    deadline: string | null;
}

export enum TaskStatus{
    Todo = 0,
    InProgress = 1,
    Done = 2
}