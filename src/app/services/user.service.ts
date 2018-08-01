import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestBase } from './request-base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: HttpClient) {
    super(http);
  }

}
