import { createAction, props } from '@ngrx/store';
import { Message } from '../../interfaces';

export class MessagePayload {
  payload: Message;

  constructor(message: Message) {
    this.payload = message;
  }
}

export class MessagesPayload {
  payload: Message[];

  constructor(messages: Message[]) {
    this.payload = messages;
  }
}

export class OnlineStatusPayload {
  payload: boolean;

  constructor(online: boolean) {
    this.payload = online;
  }
}

export class SearchMessagePayload {
  payload: string;

  constructor(searchText: string) {
    this.payload = searchText;
  }
}

export const onlineStatusAction = createAction(
  '[Polling] Online Status'
);

export const updateStatusAction = createAction(
  '[Polling] Update Status',
  props<OnlineStatusPayload>()
);

export const startPollingAction = createAction(
  '[Polling] Start Polling'
);

export const stopPollingAction = createAction(
  '[Polling] Stop Polling'
);

export const messagesAction = createAction(
  '[Polling] Messages',
  props<MessagesPayload>()
);

export const sendMessageAction = createAction(
  '[Polling] Send Message',
  props<MessagePayload>()
);

export const messageSentAction = createAction(
  '[Polling] Message Sent'
);

export const searchMessageAction = createAction(
  '[Polling] Search Message',
  props<SearchMessagePayload>()
);
