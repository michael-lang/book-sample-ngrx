import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { AuthState, AuthStatusState } from './auth.store';

export const getLoggedIn = (state: AuthStatusState) => state.loggedIn;
export const getUser = (state: AuthStatusState) => state.user;

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const selectLoggedIn = createSelector(selectAuthStatusState, getLoggedIn);
export const selectUser = createSelector(selectAuthStatusState, getUser);
