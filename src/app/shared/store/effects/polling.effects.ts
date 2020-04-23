import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, from, of, fromEvent, EMPTY, Subscription, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { sendMessageAction, onlineStatusAction, updateStatusAction, OnlineStatusPayload, startPollingAction, messagesAction, stopPollingAction, MessagesPayload } from '../actions';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Message } from '../../interfaces';

const RECONNECT_TIMEOUT = 5000;

@Injectable()
export class PollingEffects {
  subscription: Subscription;
  id: number;

  constructor(
    private http: HttpClient,
    private action$: Actions
  ) { }

  private fetchMessages(): Observable<Message[]> {
    return new Observable(observer => {
      this.subscription = this.http
        .post(`${environment.api}/subscribe`, {
          id: this.id
        }, {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
          })
        .pipe(
          map((res: { messages: Message[], id: number }) => {
            this.id = res.id;
            return res.messages;
          }),
          catchError(err => throwError(err))
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  startPollingAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(startPollingAction),
      mergeMap(() => this.fetchMessages().pipe(
        map(res => messagesAction(new MessagesPayload(res))),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 0) {
            return of(stopPollingAction());
          } else {
            return of().pipe(
              delay(RECONNECT_TIMEOUT),
              map(() => messagesAction(new MessagesPayload(null)))
            )
          }
        })
      )))
  );

  messagesAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(messagesAction),
      mergeMap(() => this.fetchMessages().pipe(
        map(res => messagesAction(new MessagesPayload(res))),
        catchError(() => of().pipe(
          delay(RECONNECT_TIMEOUT),
          map(() => messagesAction(new MessagesPayload(null)))
        ))
      )))
  );

  stopPollingAction$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(stopPollingAction),
      map(() => {
        this.subscription && this.subscription.unsubscribe();
        return of(true);
      })
    ),
    { dispatch: false }
  );

  onlineStatusAction$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(onlineStatusAction),
      mergeMap(() =>
        from([
          fromEvent(window, 'online'),
          fromEvent(window, 'offline')
        ])
          .pipe(
            mergeMap(ev => ev.pipe(
              map(event => updateStatusAction(new OnlineStatusPayload(event.type === 'online')))
            ))
          ))
    )
  );

  sendMessageEffect$: Observable<any> = createEffect(() =>
    this.action$.pipe(
      ofType(sendMessageAction),
      mergeMap((action: any) => this.http.post(`${environment.api}/publish`, action.payload, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(
        map(() => EMPTY)
      ))
    ),
    { dispatch: false }
  );
}
