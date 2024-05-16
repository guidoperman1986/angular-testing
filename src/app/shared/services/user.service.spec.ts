import { UserInterface } from '../types/user.interface';
import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

/* const mockUtilsService = {
  pluck: jest.fn(),
}; */

describe('UserService', () => {
  let userService: UserService;
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        UtilsService,
        /* { provide: UtilsService, useValue: mockUtilsService }, */
      ],
    });

    userService = TestBed.inject(UserService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should add user', () => {
    const user: UserInterface = { id: '1', name: 'foo' };

    userService.addUser(user);

    expect(userService.users).toEqual([{ id: '1', name: 'foo' }]);
  });

  it('should remove user', () => {
    userService.removeUser('1');

    expect(userService.users).toEqual([]);
    expect(userService.users.length).toBe(0);
  });

  test('should get usernames', () => {
    //mocking the function
    //replacing a function

    //mockUtilsService.pluck.mockReturnValueOnce(['foo']);
    //expect(userService.getUserNames()).toEqual(['foo']);

    //spying the function (testing the function itself to see what receives and what returns)
    //also is posible to see if it is called
    jest.spyOn(utilsService, 'pluck');
    userService.users = [{ id: '1', name: 'foo' }];
    userService.getUserNames();

    expect(utilsService.pluck).toHaveBeenCalled();
    expect(utilsService.pluck).toHaveBeenCalledWith(userService.users, 'name');
  });
});
