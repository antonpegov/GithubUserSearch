import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DEV_REDUCERS, syncReducers, AppState } from './reducers';
import { RouterEffects } from './effects/router';
import { UserEffects } from './models/user/user.effects';
import { UserListEffects } from './models/userlist/userlist.effects';

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS] : [];

export const APP_IMPORTS = [
  ButtonsModule,
  FormsModule,
  BrowserAnimationsModule,
  EffectsModule.forRoot([
    RouterEffects,
    UserEffects,
    UserListEffects
  ]),
  NgbModule.forRoot(),
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
];
