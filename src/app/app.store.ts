import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { LayoutState, layoutReducer } from './core/store/layout.store';

export interface AppState {
  layout: LayoutState;
}

// Global reducers, others will be added at the feature module level
// TODO restore typing once https://github.com/ngrx/platform/issues/951 is fixed
export const appReducers: ActionReducerMap<AppState, any> = {
  layout: layoutReducer
};

export const appMetaReducers: MetaReducer<AppState> [] = []; // environment.enableStoreFreeze ? [storeFreeze] : [];
