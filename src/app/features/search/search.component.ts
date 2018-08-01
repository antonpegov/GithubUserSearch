import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { User } from '../../models/user/user.model';
import { UserList } from '../../models/userlist/userlist';
import * as userListAction from '../../models/userlist/userlist.actions';

@Component({
  selector: 'app-page-1',
  templateUrl: './search.component.pug',
})

export class SearchComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  userList$: Observable<UserList>;
  userListLoaded$: Observable<boolean>;
  userlist: UserList;
  str: string = undefined;
  ready = true;

  constructor (
    public $store: Store<fromRoot.AppState>,
  ) {
    this.userList$ = $store.select(fromRoot.getUserList);
    this.userListLoaded$ = $store.select(fromRoot.getUsersLoaded);

    this.userList$.subscribe(_userlist => this.userlist = _userlist);
    this.userListLoaded$.subscribe(_loaded => this.ready = _loaded);
  }

  search() {
    console.log('searching...');
    this.$store.dispatch(new userListAction.Search(this.str));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
