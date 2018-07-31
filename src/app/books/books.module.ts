import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../shared/pipes';
import { BooksRoutingModule } from './books-routing.module';
import { booksFeatureReducer } from './store/book.store';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookPreviewListComponent } from './book-preview-list/book-preview-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookAuthorsComponent } from './book-authors/book-authors.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
    BooksRoutingModule,
    StoreModule.forFeature('books', booksFeatureReducer),
    EffectsModule.forFeature([]), // TODO: add effects for books
  ],
  declarations: [BookSearchComponent, BookPreviewComponent, BookPreviewListComponent, BookDetailComponent, BookAuthorsComponent]
})
export class BooksModule { }
