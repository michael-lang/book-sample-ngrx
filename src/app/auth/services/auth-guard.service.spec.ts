import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AuthGuard } from './auth-guard.service';
import { appReducers } from '../../app.store';
import { authStatusActions, authFeatureReducer } from '../store/auth.store';
import { featureAction } from 'src/lib/feature-actions';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...appReducers,
          auth: authFeatureReducer,
        }),
      ],
      providers: [AuthGuard],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.get(AuthGuard);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const user: any = {};
    const action = featureAction(authStatusActions.loginSuccess, { user });
    store.dispatch(action);

    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
