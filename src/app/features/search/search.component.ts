import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-page-1',
  templateUrl: './search.component.pug',
})

export class SearchComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  user$: Observable<User>;
  qrString: string = undefined;

  constructor (
    public $store: Store<fromRoot.AppState>,
  ) {

  }

  ngOnInit() {
    // this.form.get('name').setValue(this.user.name);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
