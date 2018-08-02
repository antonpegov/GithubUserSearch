import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-page-2',
  templateUrl: './user.component.pug'
})

export class UserComponent  implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  user: User;
  userName: string;
  user$: Observable<User>;

  constructor(
    private $store: Store<AppState>,
    private $user: UserService,
  ) {
    this.user$ = this.$store.select(state => state.user.user);
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user && user.login) {
        this.user = user;
      } else {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      this.$user.getUserData(this.user).subscribe(data => {
        this.userName = data.name;
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
