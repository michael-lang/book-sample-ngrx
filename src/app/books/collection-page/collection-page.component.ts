import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../books.models';
import { BookFeatureAppState } from '../store/book.store';
import { selectBookCollection } from '../store/collection.store.selectors';
import { collectionActions } from '../store/collection.store';

@Component({
  selector: 'app-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.css']
})
export class CollectionPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<BookFeatureAppState>) {
    this.books$ = store.pipe(select(selectBookCollection));
  }

  ngOnInit() {
    this.store.dispatch(collectionActions.create(collectionActions.load, undefined));
  }
}
