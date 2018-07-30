import { OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { getActionMetadataEntry, hasActionMetadataEntry } from './action-decorator';

export interface TPAction<TP> extends Action {
  payload: TP;
}

export function ofAction<TState, TP, T extends TPAction<TP>>(
  actionMethod: (state: TState, payload: TP) => TState
): OperatorFunction<Action, TP> {
  const hasMeta = hasActionMetadataEntry(actionMethod);
  const meta = hasMeta
    ? getActionMetadataEntry(actionMethod)
    : { actionName: '' };

  return pipe(
    filter((action: Action): action is T =>
      hasMeta && meta.actionName === action.type
    ),
    map(a => a.payload)
  );
}
