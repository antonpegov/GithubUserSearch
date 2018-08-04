import { Action } from '@ngrx/store';
import { UserList } from './userlist';

export enum UserListActionTypes {
  Extend = '[UserList] Extend UserList',
  ExtendSuccess = '[UserList] ExtendSuccess UserList',
  Set = '[UserList] Set UserList',
  Search = '[UserList] Start Search',
  Error = '[UserList] Search Error',
}

export class Extend implements Action {
  readonly type = UserListActionTypes.Extend;
  constructor(public payload: UserList) { }
}

export class ExtendSuccess implements Action {
  readonly type = UserListActionTypes.ExtendSuccess;
  constructor(public payload: UserList) { }
}
export class Set implements Action {
  readonly type = UserListActionTypes.Set;
  constructor(public payload: UserList, public pattern: string) { }
}

export class Search implements Action {
  readonly type = UserListActionTypes.Search;
  constructor(public payload: string) { }
}

export class ServerError implements Action {
  readonly type = UserListActionTypes.Error;
  constructor(public payload: string) { }
}

export type UserListActions =
  | Extend
  | ExtendSuccess
  | Set
  | Search
  | ServerError;
