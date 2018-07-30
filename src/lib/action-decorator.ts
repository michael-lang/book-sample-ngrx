import { FeatureReducer } from './feature-reducer';
import { Action } from '@ngrx/store';

const METADATA_KEY = '__store/actions__';

export interface ActionMetadata<TState> {
  actionName: string;
  action: (state: TState, payload: Action) => TState;
}

/**
 * Get the action metadata for a function decorated with @ActionReducer,
 * useful in dispatching a single action function via ngrx.
 * @param actionProto A property value returning a function of the required type
 */
export function getActionMetadataEntry<TState, TP>(
  actionProto: (state: TState, payload: TP) => TState
): ActionMetadata<TState> {
    // get the action metadata for 'action' parameter from stored actionMetadata
    if (actionProto.hasOwnProperty(METADATA_KEY)) {
      const meta = (actionProto as any)[METADATA_KEY];
      return meta;
    }
    throw Error('Action function is not registered, it must be decorated with @ActionReducer().');
}
export function hasActionMetadataEntry<TState, TP>(
  actionProto: (state: TState, payload: TP) => TState
): boolean {
    // get the action metadata for 'action' parameter from stored actionMetadata
    if (actionProto.hasOwnProperty(METADATA_KEY)) {
      const meta = (actionProto as any)[METADATA_KEY];
      return true;
    }
    return false;
}
/**
 * Gets all metadata entries for all actions on a reducer class.
 * Used to build a combined reducer function for action methods on a class.
 */
export function getActionMetadataEntries<TState>(sourceProto: FeatureReducer<TState>): ActionMetadata<TState>[] {
  return (sourceProto as any).constructor[METADATA_KEY] || [];
}
function setActionMetadataEntry<TState, TP>(
  sourceProto: FeatureReducer<TState>,
  actionProto: (state: TState, payload: TP) => TState,
  entry: ActionMetadata<TState>
) {
  const constructor = sourceProto.constructor;
  if (!constructor.hasOwnProperty(METADATA_KEY)) {
    Object.defineProperty(constructor, METADATA_KEY, {value: []});
  }
  const all = (<any>constructor)[METADATA_KEY];
  all.push(entry);
  Object.defineProperty(actionProto, METADATA_KEY, {value: entry});
}

/**
 * Can be applied to a property returning a function matching: (state: T, payload: {}) => T.
 * @example @ActionReducer<T>()
 **/
export function ActionReducer<TState>() {
  /**
   * @param target The prototype of the class containing the method/function
   * @param propertyKey The name of the method/function
   * @param descriptor The required signature of the method/function
   **/
  return <T extends FeatureReducer<TState>, R extends (state: TState, payload: any) => TState>(
    target: T,
    name: string | symbol,
    descriptor: TypedPropertyDescriptor<(state: TState, payload: any) => TState>
  ) => {
    if (descriptor.value === undefined) {
      console.error('Bad ActionReducer defined: ', target, name, descriptor);
      throw Error('ActionReducer "' + name.toString() + '" function cannot be undefined!?');
    }
    const className = target.constructor.name;
    const metadata = {actionName: `[${className}] ${name.toString()}`, action: descriptor.value};
    // console.log('ActionReducer defined: ', metadata);
    setActionMetadataEntry<TState, any>(target, descriptor.value, metadata);
  };
}
