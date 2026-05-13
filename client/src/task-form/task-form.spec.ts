import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';
import { Store } from '@ngrx/store';
import { TaskStatus } from '../app/models/task.model';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let store: any;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn(() => ({ subscribe: jest.fn() }))
    };

    await TestBed.configureTestingModule({
      imports: [TaskForm],
      providers: [{ provide: Store, useValue: store }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createTask when no task exists', () => {
    component.title = 'Test';
    component.description = 'Description';
    component.status = TaskStatus.Todo;
    component.deadline = new Date();

    component.task = undefined;
    component.saveTask();

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch updateTask when task exists', () => {
    component.task = {
    id: '1',
    title: 'Old',
    description: '',
    status: 0,
    deadline: null
  };

  component.title = 'New';

  component.saveTask();

  expect(store.dispatch).toHaveBeenCalled();
  })

  it('should convert date', () => {
    component.deadline = new Date('2026-01-01');

    component.saveTask();

    const dispatched = store.dispatch.mock.calls[0][0];

    expect(dispatched.task.deadline).toContain('2026-01-01');
  })

  it('should clear form after save', () => {
    component.title = 'Test';
    component.description = 'Desc';
    component.status = TaskStatus.Todo;

    component.clearForm();

    expect(component.title).toBe('');
    expect(component.description).toBe('');
    expect(component.status).toBe(TaskStatus.Todo);
  })

  it('should populate form on edit', () => {
    component.task = {
    id: '1',
    title: 'Edit me',
    description: 'Desc',
    status: 1,
    deadline: '2026-01-01T00:00:00Z'
  };

  component.ngOnChanges();

  expect(component.title).toBe('Edit me');
  expect(component.description).toBe('Desc');
  })
});
