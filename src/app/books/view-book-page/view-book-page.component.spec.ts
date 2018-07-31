import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material';

import { ViewBookPageComponent } from './view-book-page.component';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { BookFeatureAppState, bookActions } from '../store/book.store';
import { SelectedBookPageComponent } from '../selected-book-page/selected-book-page.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';

describe('View Book Page', () => {
  const params = new BehaviorSubject({});
  let fixture: ComponentFixture<ViewBookPageComponent>;
  let store: Store<BookFeatureAppState>;
  let instance: ViewBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params },
        },
        {
          provide: Store,
          useValue: {
            select: jest.fn(),
            next: jest.fn(),
            pipe: jest.fn(),
          },
        },
      ],
      declarations: [
        ViewBookPageComponent,
        SelectedBookPageComponent,
        BookDetailComponent,
        BookAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  // it('should compile', () => {
  //   fixture.detectChanges();

  //   expect(fixture).toMatchSnapshot();
  // });

  it('should dispatch a book.Select action on init', () => {
    const action = bookActions.create(bookActions.select, '2');
    params.next({ id: '2' });

    fixture.detectChanges();

    expect(store.next).toHaveBeenCalledWith(action);
  });
});
