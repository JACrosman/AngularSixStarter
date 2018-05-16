export type ComparerStr<T> = {
  (a: T, b: T): string;
};

export type ComparerNum<T> = {
  (a: T, b: T): number;
};

export type Comparer<T> = ComparerNum<T> | ComparerStr<T>;

export type IdSelectorStr<T> = {
  (model: T): string;
};

export type IdSelectorNum<T> = {
  (model: T): number;
};

export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export type DictionaryNum<T> = {
  [id: number]: T;
};

export abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}

export type UpdateStr<T> = {
  id: string;
  changes: Partial<T>;
};

export type UpdateNum<T> = {
  id: number;
  changes: Partial<T>;
};

export type Update<T> = UpdateStr<T> | UpdateNum<T>;

export interface EntityState<T> {
  ids: string[] | number[];
  entities: Dictionary<T>;
}

export interface EntityDefinition<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
}

export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(entity: T, state: S): S;
  addMany<S extends EntityState<T>>(entities: T[], state: S): S;
  addAll<S extends EntityState<T>>(entities: T[], state: S): S;

  removeOne<S extends EntityState<T>>(key: string, state: S): S;
  removeOne<S extends EntityState<T>>(key: number, state: S): S;

  removeMany<S extends EntityState<T>>(keys: string[], state: S): S;
  removeMany<S extends EntityState<T>>(keys: number[], state: S): S;

  removeAll<S extends EntityState<T>>(state: S): S;

  updateOne<S extends EntityState<T>>(update: Update<T>, state: S): S;
  updateMany<S extends EntityState<T>>(updates: Update<T>[], state: S): S;

  upsertOne<S extends EntityState<T>>(entity: T, state: S): S;
  upsertMany<S extends EntityState<T>>(entities: T[], state: S): S;
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
  getInitialState(): EntityState<T>;
  getInitialState<S extends object>(state: S): EntityState<T> & S;
}

export function defaultSelectId(entity: any) {
  return entity == null ? undefined : entity.id;
}

export function toUpdateFactory<T>(selectId?: any) {
  selectId = selectId || defaultSelectId;

  return function toUpdate(entity: Partial<T>): Update<T> {
    const id: any = selectId(entity);
    if (id == null) { throw new Error('Primary key may not be null/undefined.'); }
    return entity && { id, changes: entity } ;
  };
}
