import { Action } from '@ngrx/store';
import { FeatureActions } from 'src/lib/feature-actions';
import { FeatureAction } from 'src/lib/feature-action-decorator';
import { Book } from '../books.models';


export interface CollectionState {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialCollectionState: CollectionState = {
  loaded: false,
  loading: false,
  ids: [],
};

export class CollectionActions extends FeatureActions<CollectionState> {
  @FeatureAction<CollectionState>()
  addBook(state: CollectionState, payload: Book) {
    return state; // action is an effect trigger
  }
  @FeatureAction<CollectionState>()
  addBookSuccess(state: CollectionState, payload: Book) {
    if (state.ids.indexOf(payload.id) > -1) {
      return state;
    }

    return {
      ...state,
      ids: [...state.ids, payload.id],
    };
  }
  @FeatureAction<CollectionState>()
  addBookFail(state: CollectionState, payload: Book) {
    return this.removeBookSuccess(state, payload);
  }

  @FeatureAction<CollectionState>()
  removeBook(state: CollectionState, payload: Book) {
    return state; // action is an effect trigger
  }
  @FeatureAction<CollectionState>()
  removeBookSuccess(state: CollectionState, payload: Book) {
    return {
      ...state,
      ids: state.ids.filter(id => id !== payload.id),
    };
  }
  @FeatureAction<CollectionState>()
  removeBookFail(state: CollectionState, payload: Book) {
    return this.addBookSuccess(state, payload);
  }

  @FeatureAction<CollectionState>()
  load(state: CollectionState, payload: any) {
    return {
      ...state,
      loading: true,
    };
  }
  @FeatureAction<CollectionState>()
  loadSuccess(state: CollectionState, payload: Book[]) {
    return {
      loaded: true,
      loading: false,
      ids: payload.map(book => book.id),
    };
  }
  @FeatureAction<CollectionState>()
  loadFail(state: CollectionState, payload: any) {
    return state; // action is an effect trigger
  }
}

export const collectionActions = new CollectionActions();
const reducer = FeatureActions.createReducer(initialCollectionState, collectionActions);
export function collectionReducer(state: CollectionState, action: Action): CollectionState {
  return reducer(state, action);
}
