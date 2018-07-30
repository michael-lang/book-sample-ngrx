import { getActionMetadataEntries, getActionMetadataEntry } from './action-decorator';
import { TPAction } from './effects';
import { Action } from '@ngrx/store';

export class FeatureReducer<TState> {
  static createReducer<TState>(initialState: TState, inst: FeatureReducer<TState>)
    : (state: TState, action: Action) => TState {
      const handlers: {
        [key: string]: (state: TState, action: Action) => TState
      } = {};

    const metadata = getActionMetadataEntries(inst);
    metadata.forEach((md) => {
      handlers[md.actionName] = md.action;
    });

    // console.warn('reducer map created:', metadata);
    return (state: TState = initialState, action: Action) =>
      (handlers[action.type] ? handlers[action.type](state, (<{type: string, payload: any}>action).payload) : state);
  }

  public create<TP>(
    action: (state: TState, payload: TP) => TState,
    payload: TP
  ): TPAction<TP> {
    const actionMetadata = getActionMetadataEntry(action);
    return { type: actionMetadata.actionName, payload: payload };
  }
}
