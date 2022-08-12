import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LessonsIndexComponent } from './components/lessons-index/lessons-index.component';
import { LessonsEditComponent } from './components/lessons-edit/lessons-edit.component';
import { LessonsAddComponent } from './components/lessons-add/lessons-add.component';
import { LessonsTableComponent } from './components/lessons-table/lessons-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LessonsIndexComponent },
      { path: 'add', component: LessonsAddComponent },
      { path: 'edit/:id', component: LessonsEditComponent },
    ],
  },
];

@NgModule({
  declarations: [LessonsIndexComponent, LessonsAddComponent, LessonsEditComponent, LessonsTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, ReactiveFormsModule],
})
export class LessonsModule {}
