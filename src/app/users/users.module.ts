import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersIndexComponent } from './components/users-index/users-index.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsersIndexComponent },
      { path: 'add', component: UserAddComponent },
      { path: 'edit/:id', component: UserEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserAddComponent,
    UserEditComponent,
    UsersIndexComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
  ]
})
export class UsersModule { }
