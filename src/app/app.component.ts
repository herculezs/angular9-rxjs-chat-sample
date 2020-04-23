import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, BehaviorSubject, interval } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { loginKey, pollingKey, onlineStatusAction, startPollingAction, stopPollingAction, AppState, loadThemesAction } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isUserLoggedIn$: Observable<boolean>;
  onlineStatus$: Observable<boolean>;
  myNumber$ = new BehaviorSubject<number>(0);

  connecting = false;

  constructor(private store: Store<AppState>) {
    this.isUserLoggedIn$ = this.store.pipe(
      select(loginKey),
      map(({ loggedIn }) => loggedIn)
    );
    this.onlineStatus$ = this.store.pipe(
      select(pollingKey),
      map(({ online }) => online)
    );
  }

  ngOnInit() {
    this.store.dispatch(onlineStatusAction());
    this.store.dispatch(loadThemesAction());

    this.checkOnlineLoggedIn();
    this.handleNumbers();
  }

  /**
   * Task 3: Output random numbers each 2 seconds
   */
  handleNumbers() {
    interval(60000).pipe(
      withLatestFrom(
        interval(500).pipe(
          map(() => this.myNumber$.next(Math.ceil(Math.random() * 1000))),
          mergeMap(() => this.myNumber$.asObservable())
        )
      ),
      map(res => res[1])
    ).subscribe(num => console.info('Output number:', num));
  }

  /**
   * Task 1 and Task 2
   */
  checkOnlineLoggedIn() {
    combineLatest(
      this.onlineStatus$,
      this.isUserLoggedIn$
    )
      .subscribe(([onlineStatus, isUserLoggedIn]) => {
        if (onlineStatus && isUserLoggedIn) {
          if (!this.connecting) {
            console.info('User is online and logged in');
            this.store.dispatch(startPollingAction());
            this.connecting = true;
          }
        } else {
          this.store.dispatch(stopPollingAction());
          this.connecting = false;
        }
      });
  }
}
