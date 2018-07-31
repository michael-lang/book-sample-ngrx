import { CollectionPageComponent } from './collection-page.component';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule, MatInputModule } from '@angular/material';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { BookFeatureAppState, booksFeatureReducer } from '../store/book.store';
import { BookPreviewListComponent } from '../book-preview-list/book-preview-list.component';
import { BookPreviewComponent } from '../book-preview/book-preview.component';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';
import { collectionActions } from '../store/collection.store';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let store: Store<BookFeatureAppState>;
  let instance: CollectionPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          books: booksFeatureReducer,
        }),
        MatCardModule,
        MatInputModule,
        RouterTestingModule,
      ],
      declarations: [
        CollectionPageComponent,
        BookPreviewListComponent,
        BookPreviewComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  // it('should compile', () => {
  //   fixture.detectChanges();

  //   expect(fixture).toMatchSnapshot();
  // });

  it('should dispatch a collection.Load on init', () => {
    const action = collectionActions.create(collectionActions.load, undefined);

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
