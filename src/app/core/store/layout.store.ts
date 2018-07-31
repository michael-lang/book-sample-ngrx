import { Action } from '@ngrx/store';
import { FeatureActions } from 'src/lib/feature-actions';
import { FeatureAction } from 'src/lib/feature-action-decorator';

export interface LayoutState {
  showSidenav: boolean;
}

const initialLayoutState: LayoutState = {
  showSidenav: false
};

export class LayoutActions extends FeatureActions<LayoutState> {
  @FeatureAction<LayoutState>()
  closeSidenav(state: LayoutState, payload: any) {
    return {
      showSidenav: false,
    };
  }
  @FeatureAction<LayoutState>()
  openSidenav(state: LayoutState, payload: any) {
    return {
      showSidenav: true,
    };
  }
}
export const layoutActions = new LayoutActions();
const reducer = FeatureActions.createReducer(initialLayoutState, layoutActions);
export function layoutReducer(state: LayoutState, action: Action): LayoutState {
  return reducer(state, action);
}
