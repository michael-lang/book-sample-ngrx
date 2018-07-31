import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../books.models';
import { BookFeatureAppState } from '../store/book.store';
import { selectSelectedBook } from '../store/book.store.selectors';
import { isSelectedBookInCollection } from '../store/collection.store.selectors';
import { collectionActions } from '../store/collection.store';

@Component({
  selector: 'app-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-book-page.component.html'
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<BookFeatureAppState>) {
    this.book$ = store.pipe(select(selectSelectedBook)) as Observable<Book>;
    this.isSelectedBookInCollection$ = store.pipe(
      select(isSelectedBookInCollection)
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(collectionActions.create(collectionActions.addBook, book));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(collectionActions.create(collectionActions.removeBook, book));
  }
}
