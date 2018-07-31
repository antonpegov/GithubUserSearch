/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { SearchComponent } from './features/search/search.component';
import { UserComponent } from './features/user/user.component';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' },
  { path: 'user', loadChildren: './features/user/index#UserModule' },
  { path: '**', component: NotFound404Component }
];
