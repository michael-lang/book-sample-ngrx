import { ActionReducer } from 'src/lib/action-decorator';
import { FeatureReducer } from 'src/lib/feature-reducer';
import { Action } from '@ngrx/store';

export interface LayoutState {
  showSidenav: boolean;
}

const initialLayoutState: LayoutState = {
  showSidenav: false
};

export class LayoutReducer extends FeatureReducer<LayoutState> {
  @ActionReducer<LayoutState>()
  closeSidenav(state: LayoutState, payload: any) {
    return {
      showSidenav: false,
    };
  }
  @ActionReducer<LayoutState>()
  openSidenav(state: LayoutState, payload: any) {
    return {
      showSidenav: true,
    };
  }
}
export const layout = new LayoutReducer();
const reducer = FeatureReducer.createReducer(initialLayoutState, layout);
export function layoutReducer(state: LayoutState, action: Action): LayoutState {
  return reducer(state, action);
}
