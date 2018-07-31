import { Action } from '@ngrx/store';
import { FeatureReducer } from 'src/lib/feature-reducer';
import { ActionReducer } from 'src/lib/action-decorator';
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

export class CollectionReducer extends FeatureReducer<CollectionState> {
  @ActionReducer<CollectionState>()
  addBook(state: CollectionState, payload: Book) {
    return state; // action is an effect trigger
  }
  @ActionReducer<CollectionState>()
  addBookSuccess(state: CollectionState, payload: Book) {
    if (state.ids.indexOf(payload.id) > -1) {
      return state;
    }

    return {
      ...state,
      ids: [...state.ids, payload.id],
    };
  }
  @ActionReducer<CollectionState>()
  addBookFail(state: CollectionState, payload: Book) {
    return this.removeBookSuccess(state, payload);
  }

  @ActionReducer<CollectionState>()
  removeBook(state: CollectionState, payload: Book) {
    return state; // action is an effect trigger
  }
  @ActionReducer<CollectionState>()
  removeBookSuccess(state: CollectionState, payload: Book) {
    return {
      ...state,
      ids: state.ids.filter(id => id !== payload.id),
    };
  }
  @ActionReducer<CollectionState>()
  removeBookFail(state: CollectionState, payload: Book) {
    return this.addBookSuccess(state, payload);
  }

  @ActionReducer<CollectionState>()
  load(state: CollectionState, payload: any) {
    return {
      ...state,
      loading: true,
    };
  }
  @ActionReducer<CollectionState>()
  loadSuccess(state: CollectionState, payload: Book[]) {
    return {
      loaded: true,
      loading: false,
      ids: payload.map(book => book.id),
    };
  }
  @ActionReducer<CollectionState>()
  loadFail(state: CollectionState, payload: any) {
    return state; // action is an effect trigger
  }
}

export const collection = new CollectionReducer();
const reducer = FeatureReducer.createReducer(initialCollectionState, collection);
export function collectionReducer(state: CollectionState, action: Action): CollectionState {
  return reducer(state, action);
}
