import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.store';
import { selectShowSidenav } from '../store/layout.store.selectors';
import { selectLoggedIn } from '../../auth/store/auth.store.selectors';
import { layoutReducer, LayoutReducer, layout } from '../store/layout.store';
import { authStatus } from '../../auth/store/auth.store';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(selectShowSidenav));
    this.loggedIn$ = this.store.pipe(select(selectLoggedIn));
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(layout.create(layout.closeSidenav, {}));
  }

  openSidenav() {
    this.store.dispatch(layout.create(layout.openSidenav, {}));
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(authStatus.create(authStatus.logout, {}));
  }
}
