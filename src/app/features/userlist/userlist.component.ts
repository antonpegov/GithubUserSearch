import { Component, OnInit, Input } from '@angular/core';
import { UserList } from '../../models/userlist/userlist';
import { User } from '../../models';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromRoot from '../../reducers';
import * as UserActions from '../../models/user/user.actions';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.pug',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() userlist: UserList;
  @Input() loaded: boolean;
  constructor(
    private $store: Store<fromRoot.AppState>
  ) {

  }

  ngOnInit(): void { }

  select(user: User) {
    this.$store.dispatch(new UserActions.SetUser(user));
  }
}
