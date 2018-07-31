import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Authenticate } from '../auth.models';
import { selectLoginPagePending, selectLoginPageError } from './store/login-page.store.selectors';
import { AuthAppState } from '../store/auth.store';
import { loginPageActions } from './store/login-page.store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(selectLoginPagePending));
  error$ = this.store.pipe(select(selectLoginPageError));

  constructor(private store: Store<AuthAppState>) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(loginPageActions.create(loginPageActions.login, $event));
  }
}
