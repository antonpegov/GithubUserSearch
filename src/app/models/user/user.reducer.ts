/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { UserActions, UserActionTypes } from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
}

export const initialState: UserState = {
  user: {
    login: undefined,
  },
  loading: false,
  loaded: true,
};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SetUser: {
      console.log({
        ...state,
        user: action.payload
      });
      return {
        ...state,
        user: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: UserState) => state.loaded;
