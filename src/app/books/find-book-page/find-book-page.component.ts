import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Book } from '../books.models';
import { bookActions, BookFeatureAppState } from '../store/book.store';
import { selectSearchQuery, selectSearchLoading, selectSearchError, selectSearchResults } from '../store/book.store.selectors';
import { featureAction } from 'src/lib/feature-actions';

@Component({
  selector: 'app-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './find-book-page.component.html'
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<BookFeatureAppState>) {
    this.searchQuery$ = store.pipe(
      select(selectSearchQuery),
      take(1)
    );
    this.books$ = store.pipe(select(selectSearchResults));
    this.loading$ = store.pipe(select(selectSearchLoading));
    this.error$ = store.pipe(select(selectSearchError));
  }

  search(query: string) {
    this.store.dispatch(featureAction(bookActions.search, query));
  }
}
