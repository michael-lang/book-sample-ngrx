import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, combineReducers, ActionReducer as ngrxActionReducer } from '@ngrx/store';
import { FeatureReducer } from 'src/lib/feature-reducer';
import { ActionReducer } from 'src/lib/action-decorator';
import { Book } from '../books.models';
import { CollectionState, collectionReducer } from './collection.store';
import { AppState } from '../../app.store';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface BookState extends EntityState<Book> {
  selectedBookId: string | null;
  loading: boolean;
  error: string;
  query: string;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialBookState: BookState = bookAdapter.getInitialState({
  selectedBookId: null,
  loading: false,
  error: '',
  query: '',
});

export interface BookFeatureState {
  books: BookState;
  collection: CollectionState;
}
export interface BookFeatureAppState extends AppState {
  books: BookFeatureState;
}

export class BookReducer extends FeatureReducer<BookState> {
  @ActionReducer<BookState>()
  search(state: BookState, query: string) {
    if (query === '') {
      return bookAdapter.removeAll({
        ...state,
        loading: false,
        error: '',
        query,
      });
    }

    return {
      ...state,
      loading: true,
      error: '',
      query,
    };
  }
  // TODO: also trigger this with CollectionState.loadSuccess
  @ActionReducer<BookState>()
  searchComplete(state: BookState, payload: Book[]) {
    /**
       * The addMany function provided by the created adapter
       * adds many records to the entity dictionary
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      return bookAdapter.addMany(payload, {
        ...state,
        loading: false,
        error: ''
      });
  }
  @ActionReducer<BookState>()
  searchError(state: BookState, payload: string) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  }
  @ActionReducer<BookState>()
  load(state: BookState, payload: Book) {
    /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
      return bookAdapter.addOne(payload, {
        ...state,
        selectedBookId: state.selectedBookId,
      });
  }
  @ActionReducer<BookState>()
  select(state: BookState, payload: string) {
    return {
      ...state,
      selectedBookId: payload,
    };
  }
}
export const books = new BookReducer();
const reducer = FeatureReducer.createReducer(initialBookState, books);
export function booksReducer(state: BookState, action: Action): BookState {
  return reducer(state, action);
}

const combinedReducer: ngrxActionReducer<any> = combineReducers({
  books: booksReducer,
  collection: collectionReducer
});
export function booksFeatureReducer(state: any, action: any) {
  return combinedReducer(state, action);
}
