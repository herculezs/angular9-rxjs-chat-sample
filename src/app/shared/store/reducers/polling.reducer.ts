import { Action, createReducer, on } from '@ngrx/store';
import { OnlineStatusPayload, updateStatusAction, messagesAction, MessagesPayload, searchMessageAction, SearchMessagePayload } from '../actions';
import { Message } from '../../interfaces';

export interface ConversationState {
  conversationId: number;
}

export interface PollingState {
  online: boolean;
  searchMessage?: string;
  messages?: Message[];
}

export const initialPollingState: PollingState = {
  online: navigator.onLine
};

export const pollingKey = 'polling';

const reducer = createReducer(
  initialPollingState,
  on(updateStatusAction, (state, data: OnlineStatusPayload) => ({ ...state, online: data.payload })),
  on(messagesAction, (state, data: MessagesPayload) => data.payload ? ({ ...state, messages: data.payload }) : state),
  on(searchMessageAction, (state, data: SearchMessagePayload) => ({ ...state, searchMessage: data.payload }))
);

export function pollingReducer(state: PollingState | undefined, action: Action) {
  return reducer(state, action);
}
