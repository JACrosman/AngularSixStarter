import { EntityState } from './entity.model';
import {
  EntityDefinition,
  Comparer,
  IdSelector,
  EntityAdapter,
} from './entity.model';
import { createUnsortedStateAdapter } from './entity-unsorted-adapter';

export function getInitialEntityState<V>(): EntityState<V> {
  return {
    ids: [],
    entities: {},
  };
}

export function createInitialStateFactory<V>() {
  function getInitialState(): EntityState<V>;
  function getInitialState<S extends object>(
    additionalState: S
  ): EntityState<V> & S;
  function getInitialState(additionalState: any = {}): any {
    return Object.assign(getInitialEntityState(), additionalState);
  }

  return { getInitialState };
}

export function createEntityAdapter<T>(
  options: {
    selectId?: IdSelector<T>;
    sortComparer?: false | Comparer<T>;
  } = {}
): EntityAdapter<T> {
  const { selectId, sortComparer }: EntityDefinition<T> = {
    sortComparer: false,
    selectId: (instance: any) => instance.id,
    ...options,
  };

  const stateFactory = createInitialStateFactory<T>();
  const stateAdapter = createUnsortedStateAdapter(selectId);

  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...stateAdapter,
  };
}
