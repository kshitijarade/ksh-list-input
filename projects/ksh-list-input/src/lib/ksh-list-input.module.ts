import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KshListInputComponent } from './ksh-list-input.component';

@NgModule({
  declarations: [KshListInputComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [KshListInputComponent]
})
export class KshListInputModule { }
