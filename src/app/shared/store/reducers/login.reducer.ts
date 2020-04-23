import { Action, createReducer, on } from '@ngrx/store';
import { UserPayload, loginSuccessAction, loggedInUserAction, logoutSuccessAction } from '../actions';

const getUser = () => localStorage.getItem('user');

export interface UserState {
  username: string;
  loggedIn: boolean;
}

export const initialUserState: UserState = {
  username: getUser(),
  loggedIn: !!getUser()
};

export const loginKey = 'login';

const reducer = createReducer(
  initialUserState,
  on(loginSuccessAction, (state, data: UserPayload) => ({ ...state, username: data.payload.username, loggedIn: true })),
  on(loggedInUserAction, state => ({ ...state, username: getUser(), loggedIn: !!getUser() })),
  on(logoutSuccessAction, state => ({ ...state, username: '', loggedIn: false })),
);

export function loginReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
