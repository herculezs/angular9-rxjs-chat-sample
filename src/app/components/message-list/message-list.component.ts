import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { pollingKey, Message, AppState, PollingState } from '../../shared';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  polling$: Observable<PollingState>

  constructor(private store: Store<AppState>) {
    this.polling$ = this.store.pipe(select(pollingKey));
  }

  searchMessages(): Observable<Message[]> {
    return this.polling$.pipe(
      map(({ messages, searchMessage }) => searchMessage ? (messages || []).filter(
        message => message.content.toLowerCase().indexOf(searchMessage.toLowerCase()) > -1
      ) : messages)
    )
  }
}
