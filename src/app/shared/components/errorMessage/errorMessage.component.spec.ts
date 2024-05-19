import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './errorMessage.component';
import { By } from '@angular/platform-browser';

describe('errorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the errorMessageComponent', () => {
    expect(component).toBeTruthy();
  });

  test('should render default error state', () => {
    const messageDiv = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );
    expect(messageDiv.nativeElement.textContent).toBe('Something went wrong');
  });

  test('should render a message', () => {
    component.message = 'Custom error message';
    fixture.detectChanges();
    const messageDiv = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );
    expect(messageDiv.nativeElement.textContent).toBe(component.message);
  });
  
});
