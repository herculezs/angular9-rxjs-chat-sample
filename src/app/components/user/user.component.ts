import { Component } from '@angular/core';
import { User, loginAction, UserPayload, UserState, loginKey, logoutAction, AppState } from '../../shared';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  newUser = {} as User;
  user$: Observable<UserState>;

  constructor(
    private store: Store<AppState>
  ) {
    this.user$ = this.store.pipe(select(loginKey));
  }

  login(isValid: boolean) {
    if (!isValid) return;
    const payload = new UserPayload(this.newUser);
    this.store.dispatch(loginAction(payload));
    this.newUser = {} as User;
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
