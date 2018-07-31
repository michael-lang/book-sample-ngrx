import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { FindBookPageComponent } from './find-book-page.component';
import { BookFeatureAppState, booksFeatureReducer, bookActions } from '../store/book.store';
import { BookSearchComponent } from '../book-search/book-search.component';
import { BookPreviewComponent } from '../book-preview/book-preview.component';
import { BookPreviewListComponent } from '../book-preview-list/book-preview-list.component';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';

describe('Find Book Page', () => {
  let fixture: ComponentFixture<FindBookPageComponent>;
  let store: Store<BookFeatureAppState>;
  let instance: FindBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          books: booksFeatureReducer,
        }),
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindBookPageComponent,
        BookSearchComponent,
        BookPreviewComponent,
        BookPreviewListComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(FindBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  // it('should compile', () => {
  //   fixture.detectChanges();

  //   expect(fixture).toMatchSnapshot();
  // });

  it('should dispatch a book.Search action on search', () => {
    const $event = 'book name';
    const action = bookActions.create(bookActions.search, $event);

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
