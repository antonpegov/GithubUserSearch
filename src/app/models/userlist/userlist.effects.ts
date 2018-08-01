/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, ActionReducer } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { UserListActions, UserListActionTypes, Set, ServerError } from './userlist.actions';
import { AppState } from '../../reducers';
import { UserService } from '../../services/user.service';
import { UserList } from '..';

@Injectable()

export class UserListEffects {
  constructor(
    private $actions$: Actions,
    private $user: UserService
  ) { }


  @Effect()
  loadUsers$ = this.$actions$.ofType(UserListActionTypes.Search).pipe(
    switchMap((action: any) => {
      return this.$user
        .getUsers(action.payload)
        .pipe(
          map((userlist: UserList) => new Set(userlist)),
          catchError(error => of(new ServerError(error)))
        );
    })
  );
}
