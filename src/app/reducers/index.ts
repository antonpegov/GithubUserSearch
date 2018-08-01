import {
  StoreModule,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { compose } from '@ngrx/store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import * as fromUserList from '../models/userlist/userlist.reducer';
import * as fromUser from '../models/user/user.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

const modules = {
  'router': routerReducer,
  'user': fromUser.userReducer
};

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromUser.UserState;
  userlist: fromUserList.UserListState;
}

export const syncReducers = {
  router: routerReducer,
  user: fromUser.userReducer,
  userlist: fromUserList.userlistReducer
};


// Selectors
export const getUserState = createFeatureSelector<fromUser.UserState>('user');
export const getUserListState = createFeatureSelector<fromUserList.UserListState>('userlist');

export const getUsersLoaded = createSelector(
  getUserListState,
  fromUserList.getLoaded
);

export const getUserList = createSelector(
  getUserListState,
  fromUserList.getUsers
);

// HMR Stuff
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}


const deepCombineReducers = (allReducers: any) => {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
};

const createReducer = (asyncReducers = {}) => {
  let allReducers = { ...syncReducers, ...asyncReducers };
  return deepCombineReducers(allReducers);
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const DEV_REDUCERS: MetaReducer<AppState>[] = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1) {
  DEV_REDUCERS.push(storeLogger());
}

