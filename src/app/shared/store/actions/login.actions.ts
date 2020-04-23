import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces';

export class UserPayload {
  payload: User;

  constructor(user: User) {
    this.payload = user;
  }
}

export const loginAction = createAction(
  '[Login] Login',
  props<UserPayload>()
);

export const loginSuccessAction = createAction(
  '[Login] Success',
  props<UserPayload>()
);

export const loggedInUserAction = createAction(
  '[Login] Current User'
);

export const logoutAction = createAction(
  '[Logout] Logout'
);

export const logoutSuccessAction = createAction(
  '[Logout] Success'
);
