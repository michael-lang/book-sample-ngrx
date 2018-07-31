import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedBookPageComponent } from './selected-book-page.component';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { BookFeatureAppState, booksFeatureReducer } from '../store/book.store';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';
import { Book, generateMockBook } from '../books.models';
import { collectionActions } from '../store/collection.store';

describe('Selected Book Page', () => {
  let fixture: ComponentFixture<SelectedBookPageComponent>;
  let store: Store<BookFeatureAppState>;
  let instance: SelectedBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          books: booksFeatureReducer,
        }),
        MatCardModule,
      ],
      declarations: [
        SelectedBookPageComponent,
        BookDetailComponent,
        BookAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(SelectedBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  // it('should compile', () => {
  //   fixture.detectChanges();

  //   expect(fixture).toMatchSnapshot();
  // });

  it('should dispatch a collection.AddBook action when addToCollection is called', () => {
    const $event: Book = generateMockBook();
    const action = collectionActions.create(collectionActions.addBook, $event);

    instance.addToCollection($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a collection.RemoveBook action on removeFromCollection', () => {
    const $event: Book = generateMockBook();
    const action = collectionActions.create(collectionActions.removeBook, $event);

    instance.removeFromCollection($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
