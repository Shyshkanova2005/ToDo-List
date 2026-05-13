import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItem } from './task-item';
import { TaskStatus } from '../app/models/task.model';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    component = fixture.componentInstance;

    component.task = {
      id: '1',
      title: 'Test',
      description: 'Test desc',
      status: TaskStatus.Todo,
      deadline: null
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete id', () => {
    const spy = jest.fn();
    component.delete.subscribe(spy);

    component.task = { id: '1', title: '', description: '', status: 0, deadline: null};

    component.onDelete();

    expect(spy).toHaveBeenCalledWith('1');
  });

 it('should edit event', () => {
  const spy = jest.fn();
  component.edit.subscribe(spy);

  const task = {
    id: '1',
    title: '',
    description: '',
    status: 0,
    deadline: null
  };

  component.task = task;

  component.onEdit();

  expect(spy).toHaveBeenCalledWith(task);
});
});
