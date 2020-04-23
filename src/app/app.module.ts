import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent, SearchMessagesComponent, SendMessageComponent, MessageListComponent, SelectThemeComponent } from './components';
import { loginReducer, loginKey, pollingKey, pollingReducer, LoginEffects, PollingEffects, themeKey, themeReducer, ThemeEffects } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchMessagesComponent,
    SendMessageComponent,
    MessageListComponent,
    SelectThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      [loginKey]: loginReducer,
      [pollingKey]: pollingReducer,
      [themeKey]: themeReducer
    }),
    EffectsModule.forRoot([
      LoginEffects,
      PollingEffects,
      ThemeEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
