import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme, AppState, themeKey, ThemeState, selectThemeAction, ThemePayload } from '../../shared';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.scss']
})
export class SelectThemeComponent {

  themeState$: Observable<ThemeState>;
  selectedIdx = 0;

  constructor(
    private store: Store<AppState>
  ) {
    this.themeState$ = this.store.pipe(select(themeKey));
  }

  selectTheme(theme: Theme) {
    const payload = new ThemePayload(theme);
    this.store.dispatch(selectThemeAction(payload));
  }
}
