import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { FindBookPageComponent } from './find-book-page/find-book-page.component';
import { SelectedBookPageComponent } from './selected-book-page/selected-book-page.component';
import { ViewBookPageComponent } from './view-book-page/view-book-page.component';
import { BookExistsGuard } from './book-exists.guard';
import { CollectionEffects } from './store/collection.store.effects';
import { BookEffects } from './store/book.store.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    BooksRoutingModule,
    StoreModule.forFeature('books', booksFeatureReducer),
    EffectsModule.forFeature([CollectionEffects, BookEffects]),
  ],
  declarations: [
    BookSearchComponent,
    BookPreviewComponent,
    BookPreviewListComponent,
    BookDetailComponent,
    BookAuthorsComponent,
    CollectionPageComponent,
    FindBookPageComponent,
    SelectedBookPageComponent,
    ViewBookPageComponent
  ],
  providers: [BookExistsGuard]
})
export class BooksModule { }
