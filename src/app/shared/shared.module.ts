import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [MainNavComponent, LeftNavComponent, HomeComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MainNavComponent, LeftNavComponent, HomeComponent],
})
export class SharedModule {}
