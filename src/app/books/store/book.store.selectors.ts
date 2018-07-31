import { BookState } from './book.store';

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
