import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-2',
  templateUrl: './user.component.pug'
})

export class UserComponent  implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  user: User;
  user$: Observable<User>;

  constructor(
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select(state => state.user.user);
    this.user$.pipe(takeUntil(this.destroyed$))
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
