import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosService } from '../../../services/todos.service';
import { MainComponent } from './main.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../../../types/todo.interface';
import { TodoComponent } from '../todo/todo.component';
import { By } from '@angular/platform-browser';

// shallow testing
@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: '',
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('FooterComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
    })
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  describe('component visibility', () => {
    test('should be hidden without todos', () => {
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).toEqual(true);
    });

    test('should be visible with todos', () => {
      todosService.todosSig.set([
        { id: '1', text: 'test', isCompleted: false },
      ]);

      fixture.detectChanges();

      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).not.toEqual(true);
    });
  });

  test('should checked be true when toggleAllTodos is pressed', () => {
    const event = {
      target: {
        checked: true,
      },
    } as unknown as Event;

    component.toggleAllTodos(event);

    expect(component.isAllTodosSelected()).toEqual(true);

    const toggleAll = fixture.debugElement.query(
      By.css('[data-testid="toggleAll"]')
    );

    expect(toggleAll.nativeElement.checked).toEqual(true);
  });

  test('should render a list of todos ', () => {
    todosService.todosSig.set([
      { id: '1', text: 'test', isCompleted: false },
      { id: '2', text: 'test2', isCompleted: true },
    ]);

    fixture.detectChanges();

    const todoComponents = fixture.debugElement.queryAll(
      By.css('app-todos-todo')
    );

    expect(todoComponents.length).toEqual(2);
    expect(todoComponents[0].componentInstance.todo).toEqual({
      id: '1',
      text: 'test',
      isCompleted: false,
    });
  });
});
