import { FeatureActions } from './feature-actions';
import { Action } from '@ngrx/store';

const METADATA_KEY = '__store/actions__';
const METADATA_CLASS_KEY = '__store/reducer__';

export interface ActionMetadata<TState> {
  actionName: string;
  methodName: string;
  action: (state: TState, payload: Action) => TState;
}

export interface ReducerMetadata {
  className: string;
  prefix: string;
}

/**
 * Get the action metadata for a function decorated with @FeatureAction,
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
    throw Error('Action function is not registered, it must be decorated with @FeatureAction().');
}
export function hasActionMetadataEntry<TState, TP>(
  actionProto: (state: TState, payload: TP) => TState
): boolean {
    // get the action metadata for 'action' parameter from stored actionMetadata
    if (actionProto.hasOwnProperty(METADATA_KEY)) {
      //const meta = (actionProto as any)[METADATA_KEY];
      return true;
    }
    return false;
}
/**
 * Gets all metadata entries for all actions on a reducer class.
 * Used to build a combined reducer function for action methods on a class.
 */
export function getActionMetadataEntries<TState>(sourceProto: FeatureActions<TState>): ActionMetadata<TState>[] {
  const reducerMeta = getReducerMetadataEntry(sourceProto);
  const list = ((sourceProto as any).constructor[METADATA_KEY] || []) as ActionMetadata<TState>[];
  // class decorators run after the method decorators
  list.forEach(action => action.actionName = `[${reducerMeta.prefix}] ${action.methodName}`);
  //console.warn('entries: ', reducerMeta, list);
  return list;
}
export function getReducerMetadataEntry(sourceProto: any): ReducerMetadata {
  const meta = sourceProto[METADATA_CLASS_KEY];
  if (!meta || !meta.prefix) {
    throw new Error(`Reducer class "${sourceProto.constructor.name}" is missing a @FeatureReducer decorator`);
  }
  return meta;
}
function setActionMetadataEntry<TState, TP>(
  sourceProto: FeatureActions<TState>,
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

const reducerCache: { [label: string]: boolean } = {};
export function FeatureReducer(prefix: string) {
  // class decorators run after method decorators
  return (ctor: Function) => {
    if (ctor === undefined) {
      console.error('Bad FeatureReducer defined: ', ctor);
      throw Error('FeatureReducer class cannot be undefined!?');
    }
    if (reducerCache[prefix]) {
      //tslint:disable-next-line:max-line-length
      throw new Error(`Reducer class "${ctor.name}", Value: '${prefix}' is not unique. Use a different value in the @FeatureReducer decorator.`); //tslint-
    }
    reducerCache[prefix] = true;

    const className = ctor.name;
    const metadata = {className: `${className}`, prefix: prefix};
    Object.defineProperty(ctor.prototype, METADATA_CLASS_KEY, {value: metadata});
  };
}

/**
 * Can be applied to a property returning a function matching: (state: T, payload: {}) => T.
 * @example @FeatureAction<T>()
 **/
export function FeatureAction<TState>() {
  /**
   * @param target The prototype of the class containing the method/function
   * @param propertyKey The name of the method/function
   * @param descriptor The required signature of the method/function
   **/
  return <T extends FeatureActions<TState>, R extends (state: TState, payload: any) => TState>( // tslint:disable-line
    target: T,
    name: string | symbol,
    descriptor: TypedPropertyDescriptor<(state: TState, payload: any) => TState>
  ) => {
    if (descriptor.value === undefined) {
      console.error('Bad FeatureAction defined: ', target, name, descriptor);
      throw Error('FeatureAction "' + name.toString() + '" function cannot be undefined!?');
    }
    // class decorators run after method decorators
    const className = target.constructor.name;
    const metadata = {
      actionName: `[${className}] ${name.toString()}`,
      methodName: name.toString(),
      action: descriptor.value
    };
    setActionMetadataEntry<TState, any>(target, descriptor.value, metadata);
  };
}
