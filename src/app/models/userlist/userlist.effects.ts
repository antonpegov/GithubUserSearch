import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';

import {
  UserListActionTypes
} from './userlist.actions';
import { AppState } from '../../reducers';
import { UserService } from '../../services/user.service';

@Injectable()

export class UserListEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}
