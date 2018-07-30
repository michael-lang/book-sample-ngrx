import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectLoggedIn, getLoggedIn } from '../store/auth.store.selectors';
import { AuthAppState, authStatus } from '../store/auth.store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthAppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(authStatus.create(authStatus.loginRedirect, {}));
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
