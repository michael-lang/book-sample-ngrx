import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ofAction } from 'src/lib/effects';
import { authStatusActions } from './auth.store';
import { Authenticate, User } from '../auth.models';
import { loginPageActions } from '../login-page/store/login-page.store';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofAction(loginPageActions.login),
    exhaustMap((auth: Authenticate) =>
      this.authService.login(auth).pipe(
        map(user => loginPageActions.create(loginPageActions.loginSuccess, { user })),
        catchError(error => of(loginPageActions.create(loginPageActions.loginFailure, error)))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofAction(loginPageActions.loginSuccess),
    tap(p => this.router.navigate(['/'])),
    switchMap(({user}) => {
      return of(authStatusActions.create(authStatusActions.loginSuccess, {user}));
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofAction(authStatusActions.loginRedirect),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );
  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofAction(authStatusActions.logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
