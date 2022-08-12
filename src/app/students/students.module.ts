import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { StudentsIndexComponent } from './components/students-index/students-index.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StudentsIndexComponent },
      { path: 'add', component: StudentAddComponent },
      { path: 'edit/:id', component: StudentEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    StudentsTableComponent,
    StudentsIndexComponent,
    StudentAddComponent,
    StudentEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class StudentsModule {}
