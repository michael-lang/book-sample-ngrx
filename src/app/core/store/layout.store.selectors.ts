import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.store';

export const getShowSidenav = (state: LayoutState) => state.showSidenav;

export const selectLayoutState = createFeatureSelector<LayoutState>('layout');

export const selectShowSidenav = createSelector(
  selectLayoutState,
  getShowSidenav
);
