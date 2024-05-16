import { Injectable, inject } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uitlsSerive = inject(UtilsService);
  users: UserInterface[] = [];

  addUser(user: UserInterface): void {
    this.users = [...this.users, user];
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((u) => u.id !== userId);
  }

  getUserNames() {
    return this.uitlsSerive.pluck(this.users, 'name');
  }
}
