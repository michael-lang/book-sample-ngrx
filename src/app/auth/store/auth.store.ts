import { User, Authenticate } from '../auth.models';
import { AppState } from '../../app.store';
import { LoginPageState, loginPageReducer } from '../login-page/store/login-page.store';
import { FeatureReducer } from 'src/lib/feature-reducer';
import { ActionReducer } from 'src/lib/action-decorator';
import { Action, combineReducers, ActionReducer as ngrxActionReducer } from '@ngrx/store';

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

export class AuthStatusReducer extends FeatureReducer<AuthStatusState> {
  @ActionReducer<AuthStatusState>()
  login(state: AuthStatusState, payload: Authenticate) {
    return state; // only used to trigger an effect
  }
  @ActionReducer<AuthStatusState>()
  loginSuccess(state: AuthStatusState, payload: {user: User}) {
    return {
      ...state,
      loggedIn: true,
      user: payload.user,
    };
  }
  @ActionReducer<AuthStatusState>()
  loginRedirect(state: AuthStatusState, payload: any) {
    return state; // only used to trigger an effect
  }
  @ActionReducer<AuthStatusState>()
  logout(state: AuthStatusState, error: any) {
    return initialAuthStatusState;
  }
}
export const authStatus = new AuthStatusReducer();
const reducer = FeatureReducer.createReducer(initialAuthStatusState, authStatus);
export function authStatusReducer(state: AuthStatusState, action: Action): AuthStatusState {
  return reducer(state, action);
}

const combinedReducer: ngrxActionReducer<any> = combineReducers({
  status: authStatusReducer,
  loginPage: loginPageReducer
});
export function authReducer(state: any, action: any) {
  return combinedReducer(state, action);
}
