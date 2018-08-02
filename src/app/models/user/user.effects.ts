/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, mergeMap, catchError, map } from 'rxjs/operators';

import {
  UserActionTypes
} from './user.actions';
import { AppState } from '../../reducers';
import { UserService } from '../../services/user.service';

@Injectable()

export class UserEffects {
  constructor(
    private $actions$: Actions,
    private $user: UserService
  ) { }

  @Effect({dispatch: false})
  openUser$ = this.$actions$.ofType(UserActionTypes.SetUser).pipe(
    map((action: any) => {this.$user.openUserPage(); localStorage.setItem('user', JSON.stringify(action.payload)); })
  );
}
