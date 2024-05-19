import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { UtilsService } from '../../services/utils.service';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const mockUtilsService = {
    range: jest.fn().mockReturnValue([1, 2, 3, 4, 5]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        /* UtilsService */ {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;

    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  it('renders correct pagination', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );

    expect(pageContainers.length).toBe(5);
    expect(pageContainers[0].nativeElement.textContent).toContain('1');
  });

  test('should show number of pages', () => {
    expect(component.pagesCount).toBe(5);
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  test('should select page', () => {
    jest.spyOn(component.pageChangeEvent, 'emit');
    const page = 2;

    component.selectPage(page);

    /* const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    ); */

    /*     const lis = document.querySelectorAll('li');
    console.log(lis[0].classList.contains('active')); */

    expect(component.pageChangeEvent.emit).toHaveBeenCalledWith(page);
  });
});
