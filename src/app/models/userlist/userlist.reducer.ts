import { Action } from '@ngrx/store';
import {UserListActions, UserListActionTypes} from './userlist.actions';
import { User, UserList } from '../';

export interface UserListState {
  userlist: UserList;
  loading: boolean;
  loaded: boolean;
}

export const emptyUserList: UserList = {
  total: 0,
  users: []
};

export const initialState: UserListState = {
  userlist: emptyUserList,
  loading: false,
  loaded: true,
};

export function userlistReducer(state = initialState, action: UserListActions): UserListState {
  switch (action.type) {
    case UserListActionTypes.Search: {
      console.log({
        ...state,
        loading: true,
        userlist: emptyUserList // action.payload
      });
      return {
        ...state,
        loading: true,
        userlist: emptyUserList // action.payload
      };
    }
    case UserListActionTypes.Set: {
      console.log({
        ...state,
        loading: false,
        loaded: true,
        userlist: action.payload
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        userlist: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

// #region Getters for Selectors
export const getLoaded = (state: UserListState) => state.loaded;
export const getUsers = (state: UserListState) => { return state.userlist; };
// #endregion


