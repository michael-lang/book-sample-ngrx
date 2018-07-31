import { CollectionState } from './collection.store';


export const getLoaded = (state: CollectionState) => state.loaded;

export const getLoading = (state: CollectionState) => state.loading;

export const getIds = (state: CollectionState) => state.ids;


