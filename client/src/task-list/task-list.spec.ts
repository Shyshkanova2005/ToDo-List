import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as TaskActions from '../app/store/tasks/task.actions';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;
  let store: any;

  beforeEach(async () => {
     store = {
      select: jest.fn(() => of([])),
      dispatch: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TaskList],
      providers: [
        {provide: Store, useValue: store }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.loadTasks()
    );
  });

  it('should dispatch deleteTask', () => {
    component.onDelete('123');
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.deleteTask({ id: '123' })
    );
  });

  it('should set selectedTask on edit', () => {
    const task = {
      id: '1',
      title: 'Test',
      description: '',
      status: 0,
      deadline: null
    };

    component.onEdit(task);

    expect(component.selectedTask).toEqual(task);
  });

   it('should dispatch updateTaskStatus', () => {
    component.onStatusChange({
      id: '1',
      status: 2
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.updateTaskStatus({
        id: '1',
        status: 2
      })
    );
  });

});
