import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CoursesIndexComponent } from './components/courses-index/courses-index.component';
import { CoursesEditComponent } from './components/courses-edit/courses-edit.component';
import { CoursesAddComponent } from './components/courses-add/courses-add.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CoursesIndexComponent },
      { path: 'add', component: CoursesAddComponent },
      { path: 'edit/:id', component: CoursesEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    CoursesIndexComponent,
    CoursesEditComponent,
    CoursesAddComponent,
    CoursesTableComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule],
})
export class CoursesModule {}
