import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { loginAction, loginSuccessAction, logoutAction, logoutSuccessAction } from '../actions';
import { mergeMap, tap } from 'rxjs/operators';
import { User } from '../../interfaces';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions) { }

  loginEffect$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      mergeMap(action => of(loginSuccessAction(action)))
    )
  );

  loginSuccessEffect$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(loginSuccessAction),
      tap((data: { payload: User }) => localStorage.setItem('user', data.payload.username))
    ),
    { dispatch: false }
  );

  logoutEffect$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(logoutAction),
      mergeMap(() => of(logoutSuccessAction()))
    )
  );

  logoutSuccessEffect$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(logoutSuccessAction),
      tap(() => localStorage.removeItem('user'))
    ),
    { dispatch: false }
  );
}
