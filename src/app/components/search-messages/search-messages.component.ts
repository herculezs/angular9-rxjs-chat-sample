import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, SearchMessagePayload, searchMessageAction } from '../../shared';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.scss']
})
export class SearchMessagesComponent implements OnInit {
  @ViewChild('search', { static: true }) searchEl: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const searchBox = this.searchEl.nativeElement;

    fromEvent(searchBox, 'keyup')
      .pipe(
        map((ev: any) => ev.currentTarget.value),
        debounceTime(500)
      )
      .subscribe(val => {
        this.store.dispatch(searchMessageAction(new SearchMessagePayload(val)));
      });
  }
}
