import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TagInterface } from '../types/tag.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should return a list of tags', () => {
    let tags: TagInterface[] | undefined;
    service.getTags().subscribe((response) => {
      tags = response;
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush([
      { id: '1', name: 'tag1' },
      { id: '2', name: 'tag2' },
    ]);
    expect(tags).not.toEqual([]);
  });

  /* test('should return a list of tags with waitForAsync', waitForAsync(() => {
    service.getTags().subscribe((response) => {
      expect(response).toEqual([
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ]);

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush([
        { id: '1', name: 'tag1' },
        { id: '2', name: 'tag2' },
      ]);
    });
  })); */

  test('should create tag', () => {
    let tag: TagInterface | undefined;
    service.createTag('tag3').subscribe((response) => {
      tag = response;
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush({ id: '3', name: 'tag3' });

    expect(tag).toEqual({ id: '3', name: 'tag3' });
  });

  test('should pass correct body to create tag', () => {
    let tag: TagInterface | undefined;
    service.createTag('tag3').subscribe((response) => {
      tag = response;
    });

    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush([{ id: '3', name: 'tag3' }]);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name: 'tag3' });
  });

  test('should return an error if request fails', () => {
    let actualError: HttpErrorResponse | undefined;

    service.createTag('foo').subscribe({
      next: () => {
        fail('success should not be called');
      },
      error: (error) => {
        actualError = error;
      },
    });

    /* if (!actualError) {
      throw new Error('Expected error to be defined');
    } */

    const req = httpTestingController.expectOne('http://localhost:3004/tags');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(actualError?.status).toEqual(500);
  });
});
