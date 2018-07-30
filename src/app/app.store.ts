import { ActionReducerMap, MetaReducer } from '@ngrx/store';

// Global state, more properties will be added at the feature module level
// tslint:disable-next-line:no-empty-interface
export interface AppState {
  // no global state needed
}

// Global reducers, others will be added at the feature module level
// TODO restore typing once https://github.com/ngrx/platform/issues/951 is fixed
export const appReducers: ActionReducerMap<AppState, any> = {
};

export const appMetaReducers: MetaReducer<AppState> [] = []; // environment.enableStoreFreeze ? [storeFreeze] : [];
