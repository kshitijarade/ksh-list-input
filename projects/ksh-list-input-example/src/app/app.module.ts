import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KshListInputModule } from 'projects/ksh-list-input/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    KshListInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
