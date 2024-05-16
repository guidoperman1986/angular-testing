import { TestBed } from '@angular/core/testing';

import { UserRxjsService } from './user-rxjs.service';
import { UserInterface } from '../types/user.interface';

describe('UserRxjsService', () => {
  let service: UserRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user', () => {
    const user: UserInterface = { id: '1', name: 'foo' };

    service.addUser(user);

    expect(service.users$.getValue()).toEqual([{ id: '1', name: 'foo' }]);
  });

  it('should remove user', () => {
    service.removeUser('1');

    expect(service.users$.getValue()).toEqual([]);
    expect(service.users$.getValue().length).toBe(0);
  });
});
