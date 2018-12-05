import { User, Authenticate } from '../auth.models';
import { AppState } from '../../app.store';
import { LoginPageState, loginPageReducer } from '../login-page/store/login-page.store';
import { FeatureActions } from 'src/lib/feature-actions';
import { FeatureAction, FeatureReducer } from 'src/lib/feature-action-decorator';
import { Action, combineReducers, ActionReducer } from '@ngrx/store';

export interface AuthStatusState {
  loggedIn: boolean;
  user: User | null;
}

export const initialAuthStatusState: AuthStatusState = {
  loggedIn: false,
  user: null,
};

export interface AuthState {
  status: AuthStatusState;
  loginPage: LoginPageState;
}

export interface AuthAppState extends AppState {
  auth: AuthState;
}

@FeatureReducer('AuthStatusActions')
export class AuthStatusActions extends FeatureActions<AuthStatusState> {
  @FeatureAction<AuthStatusState>()
  login(state: AuthStatusState, payload: Authenticate) {
    return state; // only used to trigger an effect
  }
  @FeatureAction<AuthStatusState>()
  loginSuccess(state: AuthStatusState, payload: {user: User}) {
    return {
      ...state,
      loggedIn: true,
      user: payload.user,
    };
  }
  @FeatureAction<AuthStatusState>()
  loginRedirect(state: AuthStatusState, payload: any) {
    return state; // only used to trigger an effect
  }
  @FeatureAction<AuthStatusState>()
  logout(state: AuthStatusState, error: any) {
    return initialAuthStatusState;
  }
}
export const authStatusActions = new AuthStatusActions();
const reducer = FeatureActions.createReducer(initialAuthStatusState, authStatusActions);
export function authStatusReducer(state: AuthStatusState, action: Action): AuthStatusState {
  return reducer(state, action);
}

const combinedReducer: ActionReducer<any> = combineReducers({
  status: authStatusReducer,
  loginPage: loginPageReducer
});
export function authFeatureReducer(state: any, action: any) {
  return combinedReducer(state, action);
}
