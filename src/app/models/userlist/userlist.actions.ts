import { Action } from '@ngrx/store';
import { UserList } from './userlist';

export enum UserListActionTypes {
  Set = '[UserList] Set UserList',
  Search = '[UserList] Start Search',
}

export class Set implements Action {
  readonly type = UserListActionTypes.Set;

  constructor(public payload: UserList) { }
}

export class Search implements Action {
  readonly type = UserListActionTypes.Search;

  constructor(public payload: string) { }
}

export type UserListActions =
  | Set
  | Search;
