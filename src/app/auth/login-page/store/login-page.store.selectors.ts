import { LoginPageState } from './login-page.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../store/auth.store';

export const getError = (state: LoginPageState) => state.error;
export const getPending = (state: LoginPageState) => state.pending;

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  getPending
);
