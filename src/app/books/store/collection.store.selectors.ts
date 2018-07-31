import { createSelector } from '@ngrx/store';
import { CollectionState } from './collection.store';
import { selectBooksFeatureState, getBookEntities, selectSelectedBookId } from './book.store.selectors';
import { BookFeatureState } from './book.store';


export const getLoaded = (state: CollectionState) => state.loaded;

export const getLoading = (state: CollectionState) => state.loading;

export const getIds = (state: CollectionState) => state.ids;

export const selectCollectionState = createSelector(
  selectBooksFeatureState,
  (state: BookFeatureState) => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  getLoaded
);
export const selectCollectionLoading = createSelector(
  selectCollectionState,
  getLoading
);
export const selectCollectionBookIds = createSelector(
  selectCollectionState,
  getIds
);

export const selectBookCollection = createSelector(
  getBookEntities,
  selectCollectionBookIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedBookInCollection = createSelector(
  selectCollectionBookIds,
  selectSelectedBookId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
