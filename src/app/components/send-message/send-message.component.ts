import { Component } from '@angular/core';
import { Message, loginKey, sendMessageAction, MessagePayload, AppState } from '../../shared';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {
  message = {} as Message;
  user$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(
      select(loginKey),
      map(({ username }) => username)
    );
  }

  sendMessage(valid: boolean) {
    if (!valid) return;
    this.user$.pipe(
      map(username => new MessagePayload({
        ...this.message,
        author: username
      }))
    ).subscribe(payload => {
      this.store.dispatch(sendMessageAction(payload));
      this.message = {} as Message;
    });
  }
}
