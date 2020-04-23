import { createReducer, on, Action } from '@ngrx/store';
import { Theme } from '../../interfaces';
import { saveThemesAction, ThemesPayload, selectThemeAction, ThemePayload } from '../actions';

export interface ThemeState {
  themes: Theme[];
  selectedTheme?: Theme;
}

export const initialThemeState: ThemeState = {
  themes: []
};

export const themeKey = 'theme';

const reducer = createReducer(
  initialThemeState,
  on(saveThemesAction, (state, data: ThemesPayload) => ({ ...state, themes: data.payload })),
  on(selectThemeAction, (state, data: ThemePayload) => ({ ...state, selectedTheme: data.payload }))
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
  return reducer(state, action);
}
