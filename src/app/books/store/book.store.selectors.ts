import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState, BookFeatureState, bookAdapter } from './book.store';


/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: BookState) => state.selectedBookId;

export const getIds = (state: BookState) => state.ids;

export const getQuery = (state: BookState) => state.query;

export const getLoading = (state: BookState) => state.loading;

export const getError = (state: BookState) => state.error;

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectBooksFeatureState = createFeatureSelector<BookFeatureState>('books');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectBookState = createSelector(
  selectBooksFeatureState,
  state => state.books
);

export const selectSelectedBookId = createSelector(
  selectBookState,
  getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getBookIds,
  selectEntities: getBookEntities,
  selectAll: getAllBooks,
  selectTotal: getTotalBooks,
} = bookAdapter.getSelectors(selectBookState);

export const selectSelectedBook = createSelector(
  getBookEntities,
  selectSelectedBookId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const selectSearchBookIds = createSelector(
  selectBookState,
  getIds
);
export const selectSearchQuery = createSelector(
  selectBookState,
  getQuery
);
export const selectSearchLoading = createSelector(
  selectBookState,
  getLoading
);
export const selectSearchError = createSelector(
  selectBookState,
  getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const selectSearchResults = createSelector(
  getBookEntities,
  selectSearchBookIds,
  (books, searchIds) => {
    return (<string[]>searchIds).map(id => books[id]);
  }
);
