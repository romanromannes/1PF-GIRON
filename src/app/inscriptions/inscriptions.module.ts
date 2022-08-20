import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InscriptionsIndexComponent } from './components/inscriptions-index/inscriptions-index.component';
import { InscriptionsEditComponent } from './components/inscriptions-edit/inscriptions-edit.component';
import { InscriptionsAddComponent } from './components/inscriptions-add/inscriptions-add.component';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: InscriptionsIndexComponent },
      { path: 'add', component: InscriptionsAddComponent },
      { path: 'edit/:id', component: InscriptionsEditComponent },
    ],
  },
];

@NgModule({
  declarations: [InscriptionsIndexComponent, InscriptionsAddComponent, InscriptionsEditComponent, InscriptionsTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, ReactiveFormsModule],
})
export class InscriptionsModule {}
