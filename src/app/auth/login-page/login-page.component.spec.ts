import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthAppState, authFeatureReducer, authStatusActions } from '../store/auth.store';
import { appReducers } from '../../app.store';
import { loginPageActions } from './store/login-page.store';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store<AuthAppState>;
  let instance: LoginPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          ...appReducers,
          auth: authFeatureReducer,
        }),
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginPageComponent, LoginFormComponent],
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analogous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  // it('should compile', () => {
  //   fixture.detectChanges();

  //   expect(fixture).toMatchSnapshot();
  // });

  it('should dispatch a login event on submit', () => {
    const $event: any = {};
    const action = loginPageActions.create(loginPageActions.login, $event);

    instance.onSubmit($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
