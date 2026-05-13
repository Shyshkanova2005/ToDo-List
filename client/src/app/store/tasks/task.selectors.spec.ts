import * as TaskSelectors from './task.selectors';
import { TaskStatus } from '../../models/task.model';

describe('TaskSelectors', () => {
    const state = {
    tasks: {
      tasks: [
        {
          id: '1',
          title: 'Test',
          description: '',
          status: TaskStatus.Todo,
          deadline: null
        }
      ],
      loading: false,
      error: null
    }
  };

  it('should select tasks', () => {
    const result = TaskSelectors.selectTasks(state);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Test');
  });

  it('shoukd select loading', () => {
    const result = TaskSelectors.selectLoading(state);

    expect(result).toBe(false);
  })
})