import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { loadThemesAction, saveThemesAction, ThemesPayload, selectThemeAction, ThemePayload } from '../actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Theme } from '../../interfaces';

@Injectable()
export class ThemeEffects {
  constructor(
    private http: HttpClient,
    private action$: Actions
  ) { }

  loadThemesAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(loadThemesAction),
      mergeMap(() => this.http.get('/assets/theme.json').pipe(
        map((themes: Theme[]) => saveThemesAction(new ThemesPayload(themes)))
      ))
    )
  );

  saveThemeAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(saveThemesAction),
      mergeMap((action: { payload: Theme[] }) => of(selectThemeAction(new ThemePayload(action.payload[0]))))
    )
  );

  selectThemeAction$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(selectThemeAction),
      tap((action: { payload: Theme }) => {
        const theme = action.payload;

        Object.keys(theme.properties).forEach(property => {
          document.documentElement.style.setProperty(
            property,
            theme.properties[property]
          );
        });
      })
    ),
    { dispatch: false }
  );
}
