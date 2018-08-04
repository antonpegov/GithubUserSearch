import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routes } from './user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { ChartModule } from '@progress/kendo-angular-charts';

@NgModule({
    imports: [
        CommonModule,
        ChartModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        UserComponent
    ],
    providers: [
    ]
})

export class UserModule { }
