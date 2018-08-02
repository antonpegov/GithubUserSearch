import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RequestBase } from './request-base';
import { HttpClient } from '@angular/common/http';
import { User, UserList } from '../models';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends RequestBase {
  constructor(
    @Inject('AppConfig') private $config,
    public $http: HttpClient,
    public $router: Router,
  ) {
    super($http);
  }

  getUsers(str): Observable<UserList> {
    return this.http
      .get(`${this.$config.serverUrl}/search/users?q=${str}`)
      .pipe(
        map((_resp: any) => { return {total: _resp.total_count, users: (_resp.items as User[]).splice(0, 10)}; }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getUserData(user: User) {
    return this.http
      .get(user.url)
      .pipe(
        map((_resp: any) => {return {name: _resp.name, followers: _resp.followers}; }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  openUserPage(): void {
    this.$router.navigate(['/user']);
  }
}
