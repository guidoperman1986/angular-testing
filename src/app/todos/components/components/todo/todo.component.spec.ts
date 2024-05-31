import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodosService } from '../../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';

describe('FooterComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);

    component.todo = {
      id: '1',
      text: 'todo 1',
      isCompleted: false,
    };

    component.isEditing = false;

    fixture.detectChanges();
  });

  test('creates a component', () => {
    expect(component).toBeTruthy();
  });

  test('should have todo displayed', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));

    expect(todo.nativeElement.textContent).toBe('todo 1');
  });

  test('should have correct initial state', () => {
    const todo = fixture.debugElement.query(By.css('[data-testid="todo"]'));
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));
    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));

    expect(todo.classes['completed']).not.toBeDefined();
    expect(label.nativeElement.textContent).toBe('todo 1');
    expect(todo.classes['editing']).not.toBeDefined();
    expect(edit).toBeFalsy();
  });

  test('should toggle todo', () => {
    jest.spyOn(todosService, 'toggleTodo').mockImplementation(() => {});
    /* component.toggleTodo(); */

    const todo = fixture.debugElement.query(By.css('[data-testid="toggle"]'));
    todo.nativeElement.click();
    fixture.detectChanges();

    expect(todosService.toggleTodo).toHaveBeenCalledWith('1');

    /* expect(component.todo.isCompleted).toBe(true); */
  });

  test('should untoggle todo', () => {
    jest.spyOn(todosService, 'removeTodo').mockImplementation(() => {});
    const destroy = fixture.debugElement.query(
      By.css('[data-testid="destroy"]')
    );

    destroy.nativeElement.click();

    expect(todosService.removeTodo).toHaveBeenCalledWith('1');
    expect(component.todo.isCompleted).toBe(false);
  });

  test('should set todo in edit mode', () => {
    const spy = jest
      .spyOn(component.setEditingId, 'emit')
      .mockImplementation(() => {});
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));

    component.setTodoInEditMode();

    expect(spy).toHaveBeenCalledWith('1');
  });

  test('should activate editing', () => {
    const label = fixture.debugElement.query(By.css('[data-testid="label"]'));

    let clickedTodoId: string | null | undefined;

    component.setEditingId.subscribe((id) => (clickedTodoId = id));

    label.triggerEventHandler('dblclick');
    expect(clickedTodoId).toBe('1');
  });

  test('should change todo', () => {
    jest.spyOn(todosService, 'changeTodo').mockImplementation(() => {});
    component.isEditing = true;

    fixture.detectChanges();
    const edit = fixture.debugElement.query(By.css('[data-testid="edit"]'));
    edit.nativeElement.value = 'foo';
    edit.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );

    expect(todosService.changeTodo).toHaveBeenCalledWith('1', 'foo');
  });

  test('should focus after editing activation', fakeAsync(() => {
    component.isEditing = true;

    component.ngOnChanges({
      isEditing: new SimpleChange(false, true, false),
    });

    fixture.detectChanges();
    tick();

    const edit = fixture.debugElement.query(By.css(':focus'));
    expect(edit).toBeTruthy();
  }));
});
