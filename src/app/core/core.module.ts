import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './layout/layout.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule { }
