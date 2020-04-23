import { createAction, props } from '@ngrx/store';
import { Theme } from '../../interfaces';

export class ThemesPayload {
  payload: Theme[];

  constructor(themes: Theme[]) {
    this.payload = themes;
  }
}

export class ThemePayload {
  payload: Theme;

  constructor(theme: Theme) {
    this.payload = theme;
  }
}

export const loadThemesAction = createAction(
  '[Theme] Load themes'
);

export const saveThemesAction = createAction(
  '[Theme] Save themes',
  props<ThemesPayload>()
);

export const selectThemeAction = createAction(
  '[Theme] Select theme',
  props<ThemePayload>()
);
