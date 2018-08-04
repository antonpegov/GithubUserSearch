import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromRoot from '../../reducers';
import * as UserListActions from '../../models/userlist/userlist.actions';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import 'hammerjs';
import { UserListActionTypes } from '../../models/userlist/userlist.actions';
import { UserList } from '../../models';
@Component({
  selector: 'app-page-2',
  templateUrl: './user.component.pug'
})

export class UserComponent  implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  usersAreExtended$: Observable<boolean>;
  user: User;
  users: User[];
  userName: string;
  userLocation: string;
  // user$: Observable<User>;
  readyToDrowChart = false;
  data: number[] = [];        // chart data for Y
  names: string[] = [];       // cart data for X

  constructor(
    private $store: Store<fromRoot.AppState>,
    private $user: UserService,
    private $router: Router,
  ) {
    this.$store.select(fromRoot.getUserList).subscribe(_userlist => this.users = _userlist.users);
    this.usersAreExtended$ = this.$store.select(fromRoot.getUsersExtended);
    this.usersAreExtended$.pipe(takeUntil(this.destroyed$)).subscribe(extended => {
      if (extended) {
        this.names = this.users.map(item => item.login);
        this.data = this.users.map(item => Number(item.followers));
        this.readyToDrowChart = extended;
      } else {
        this.$store.select(fromRoot.getUserList).pipe(
          take(1),
          takeUntil(this.destroyed$)
        ).subscribe(userlist => {
          this.$store.dispatch(new UserListActions.Extend(userlist));
        });
      }
    });
    this.$store.select(state => state.user.user).pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user && user.login) {
        this.user = user;
      } else {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      this.$user.getUserData(this.user).subscribe(data => {
        this.userName = data.name;
        this.userLocation = data.location;
      });
    });
  }

  goToMainPage() {
    this.$router.navigate(['/']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
