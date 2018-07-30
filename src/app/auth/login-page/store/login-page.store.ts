import { FeatureReducer } from 'src/lib/feature-reducer';
import { ActionReducer } from 'src/lib/action-decorator';
import { Action } from '@ngrx/store';

export interface LoginPageState {
  error: string | null;
  pending: boolean;
}

export const initialLoginPageState: LoginPageState = {
  error: null,
  pending: false,
};

export class LoginPageReducer extends FeatureReducer<LoginPageState> {
  @ActionReducer<LoginPageState>()
  login(state: LoginPageState, none: any) {
    return {
      ...state,
      error: null,
      pending: true,
    };
  }
  @ActionReducer<LoginPageState>()
  loginSuccess(state: LoginPageState, none: any) {
    return {
      ...state,
      error: null,
      pending: false,
    };
  }
  @ActionReducer<LoginPageState>()
  loginFailure(state: LoginPageState, error: any) {
    return {
      ...state,
      error: error,
      pending: false,
    };
  }
}
export const loginPage = new LoginPageReducer();
const reducer = FeatureReducer.createReducer(initialLoginPageState, loginPage);
export function loginPageReducer(state: LoginPageState, action: Action): LoginPageState {
  return reducer(state, action);
}
