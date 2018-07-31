
import { Action } from '@ngrx/store';
import { FeatureActions } from 'src/lib/feature-actions';
import { FeatureAction } from 'src/lib/feature-action-decorator';

export interface LoginPageState {
  error: string | null;
  pending: boolean;
}

export const initialLoginPageState: LoginPageState = {
  error: null,
  pending: false,
};

export class LoginPageActions extends FeatureActions<LoginPageState> {
  @FeatureAction<LoginPageState>()
  login(state: LoginPageState, none: any) {
    return {
      ...state,
      error: null,
      pending: true,
    };
  }
  @FeatureAction<LoginPageState>()
  loginSuccess(state: LoginPageState, none: any) {
    return {
      ...state,
      error: null,
      pending: false,
    };
  }
  @FeatureAction<LoginPageState>()
  loginFailure(state: LoginPageState, error: any) {
    return {
      ...state,
      error: error,
      pending: false,
    };
  }
}
export const loginPageActions = new LoginPageActions();
const reducer = FeatureActions.createReducer(initialLoginPageState, loginPageActions);
export function loginPageReducer(state: LoginPageState, action: Action): LoginPageState {
  return reducer(state, action);
}
