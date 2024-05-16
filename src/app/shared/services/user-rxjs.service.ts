import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRxjsService {
  users$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);

  constructor() { }

  addUser(user: UserInterface): void {
    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string): void {
    this.users$.next(this.users$.getValue().filter((u) => u.id !== userId));
  }
}
