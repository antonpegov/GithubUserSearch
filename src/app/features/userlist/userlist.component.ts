import { Component, OnInit, Input } from '@angular/core';
import { UserList } from '../../models/userlist/userlist';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.pug',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() userlist: UserList;
  constructor() {
    console.log('Got userlist:');
    console.log(this.userlist);
  }

  ngOnInit(): void { }
}
