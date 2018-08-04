/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, ActionReducer } from '@ngrx/store';
import { of, Observable, forkJoin } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';

import { UserListActions, UserListActionTypes, Set, ServerError, Extend, ExtendSuccess } from './userlist.actions';
import { AppState } from '../../reducers';
import { UserService } from '../../services/user.service';
import { UserList, User } from '..';

@Injectable()

export class UserListEffects {
  constructor(
    private actions$: Actions,
    private $user: UserService
  ) {
    this.extend$.subscribe((action) => console.log(action));
  }

  @Effect() load$ = this.actions$.ofType(UserListActionTypes.Search).pipe(
    switchMap((action: any) => {
      return this.$user
        .getUsers(action.payload)
        .pipe(
          map((userlist: UserList) => new Set(userlist, action.payload)),
          catchError(error => of(new ServerError(error)))
        );
    })
  );

  @Effect() extend$ = this.actions$.ofType(UserListActionTypes.Extend).pipe(
    switchMap((action: any) => {
      let userlist = action.payload;
      if (userlist && userlist.total > 0) {
        const observables = [];
        let newList = Object.assign({}, userlist);
        for (let i = 0; i < userlist.users.length; i += 1) {
          observables[i] = this.$user.getUserData(userlist.users[i]);
        }
        return forkJoin(observables).pipe(
          map((data: {name, followers, location}[]) => {
            let extendedUsers = userlist.users.map((item, i) => Object.assign({}, item, data[i]));
            return new ExtendSuccess({total: userlist.total, users: extendedUsers});
            // return new ServerError('Fuck it!');
          })
        );
      } else {
        // need to repeat request
        return of(new ServerError('No more userlist!'));
      }
    })
  );
}
