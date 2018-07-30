import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.store';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([]), // TODO: add effects for auth
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule { }
