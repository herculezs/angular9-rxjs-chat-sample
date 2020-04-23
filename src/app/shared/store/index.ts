import { loginKey, pollingKey, UserState, PollingState, themeKey, ThemeState } from './reducers';

export * from './actions';
export * from './reducers';
export * from './effects';

export interface AppState {
  [loginKey]: UserState;
  [pollingKey]: PollingState;
  [themeKey]: ThemeState;
}
