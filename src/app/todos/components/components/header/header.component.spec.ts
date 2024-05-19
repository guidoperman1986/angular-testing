import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TodosService } from '../../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todosService: TodosService;

  const mockTodosService = {
    addTodo: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  test('should add todo', () => {
    const spyService = jest
      .spyOn(todosService, 'addTodo')
      .mockImplementation(() => {});
    component.text = 'test';

    component.addTodo();
    expect(spyService).toHaveBeenCalled();
  });

  test('should add todo', () => {
    // another way to do the previous test

    jest
      .spyOn(todosService, 'addTodo')
      .mockImplementation(() => {});

    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]')
    );

    input.nativeElement.value = 'pato';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );

    expect(todosService.addTodo).toHaveBeenCalledWith('pato');
  });
});
