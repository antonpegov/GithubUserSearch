import { Action } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionTypes {
  SetUser = '[User] Set User',
  RemoveUser = '[User] Remove User',
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SetUser;

  constructor(public payload: User) { }
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.RemoveUser;
}

export type UserActions =
  | SetUser
  | RemoveUser;
