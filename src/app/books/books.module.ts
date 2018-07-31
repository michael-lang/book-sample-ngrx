import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BooksRoutingModule } from './books-routing.module';
import { booksFeatureReducer } from './store/book.store';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('books', booksFeatureReducer),
    EffectsModule.forFeature([]), // TODO: add effects for books
  ],
  declarations: []
})
export class BooksModule { }
