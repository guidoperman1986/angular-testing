import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TodosService } from '../../../services/todos.service';
import { FilterEnum } from '../../../types/filter.enum';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  test('should be hidden when no todos', () => {
    expect(component.noTodosClass()).toBeTruthy();

    const footer = fixture.debugElement.query(By.css('[data-testid="footer"]'));
    expect(footer.classes['hidden']).toBeTruthy();
  });

  test('should be visible with todos', () => {
    todosService.todosSig.set([{ id: '1', text: 'test', isCompleted: false }]);
    fixture.detectChanges();

    const footer = fixture.debugElement.query(By.css('[data-testid="footer"]'));
    expect(footer.classes['hidden']).not.toBeTruthy();
  });

  test('should show correct item count', () => {
    todosService.todosSig.set([{ id: '1', text: 'test', isCompleted: false }]);
    fixture.detectChanges();

    const footerCount = fixture.debugElement.query(
      By.css('[data-testid="todoCount"]')
    );
    expect(footerCount.nativeElement.textContent).toContain('1 item left ');
  });

  test('should show correct item count', () => {
    todosService.todosSig.set([
      { id: '1', text: 'test', isCompleted: false },
      { id: '2', text: 'test2', isCompleted: false },
    ]);
    fixture.detectChanges();

    const footerCount = fixture.debugElement.query(
      By.css('[data-testid="todoCount"]')
    );
    expect(footerCount.nativeElement.textContent).toContain('2 items left ');
  });

  test('highlight default filter', () => {
    const filterLinks = fixture.debugElement.queryAll(
      By.css('[data-testid="filterLink"]')
    );

    expect(
      filterLinks[0].nativeElement.classList.contains('selected')
    ).toBeTruthy();
  });

  test('should highlight changed filter', () => {
    todosService.filterSig.set(FilterEnum.active);

    fixture.detectChanges();

    const filterLinks = fixture.debugElement.queryAll(
      By.css('[data-testid="filterLink"]')
    );

    expect(
      filterLinks[1].nativeElement.classList.contains('selected')
    ).toBeTruthy();
  });

  test('should call changeFilter on filter click', () => {
    const filterLinks = fixture.debugElement.queryAll(
      By.css('[data-testid="filterLink"]')
    );

    filterLinks[1].triggerEventHandler('click');

    expect(todosService.filterSig()).toBe(FilterEnum.active);
  });
});
