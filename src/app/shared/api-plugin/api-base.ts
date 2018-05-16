import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, asapScheduler, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Store, Select, Action, StateContext } from '@ngxs/store';

import { EntityState, IdSelector } from './entity';
import { createEntityAdapter } from './entity/entity.state';
import { EntityAdapter, toUpdateFactory } from './entity/entity.model';
import { Injectors } from './injectors';

export interface ApiEntityState<T> extends EntityState<T> {
  entityId?: IdType | null;
  loading?: boolean;
  loaded?: boolean;
  error?: any | null;
}

export interface ParamMap {
  [key: string]: string;
}

export interface ApiServiceConfig {
  route: string;
  path: string;
  subRoutes?: string[];
  idSelector?: IdSelector<any>;
}

export interface RequestInfo {
  name: string;
  path: string;
  method: string;
}

export type IdType = string | number;

export function createRequestAction(
  stateName: string,
  actionName: string,
  operation: string,
  payload?: any
) {
  return { type: `[${stateName}] ${actionName} ${operation}`, payload };
}

export function createRequest(stateName: string, name?: string, payload?: any) {
  return createRequestAction(stateName, name, 'Request', payload);
}

export function createSuccess(stateName: string, name?: string, payload?: any) {
  return createRequestAction(stateName, name, 'Success', payload);
}

export function createFailure(stateName: string, name?: string, payload?: any) {
  return createRequestAction(stateName, name, 'Failure', payload);
}

export function generateParams(state: any, subRoutes: string[]) {
  return subRoutes.reduce((prev, curr) => {
    prev[curr] = state[curr].entityId;
    return prev;
  }, {});
}

export function generateUrl(info: RequestInfo, route: string, params?: ParamMap) {
  let path = `${route}${info.path}`;

  if (params) {
    Object.keys(params).forEach(param => {
      path = path.replace(`:${param}`, params[param]);
    });
  }

  return path;
}

export class ApiBaseService<T, S extends ApiEntityState<T>> {
  entities$: Observable<T[]>;
  entity$: Observable<T>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<any>;

  requests: { [key: string]: RequestInfo };
  adapter: EntityAdapter<T>;
  toUpdate: any;

  get path() {
    return this.config.path;
  }

  get store() {
    return Injectors.store;
  }

  get httpClient() {
    return Injectors.httpClient;
  }

  static defaults() {
    return {
      ids: [],
      entities: {},
      loading: false,
      loaded: false
    };
  }

  constructor(
    private config: ApiServiceConfig
  ) {
    this.requests = {};
    this.adapter = createEntityAdapter<T>({
      selectId: this.config.idSelector
    });
    this.toUpdate = toUpdateFactory(this.config.idSelector);

    this.createRequest({ name: 'query', path: '', method: 'GET' });
    this.createRequest({ name: 'get', path: '/:id', method: 'GET'});
    this.createRequest({ name: 'post', path: '', method: 'POST' });
    this.createRequest({ name: 'put', path: ':/id', method: 'PUT' });
    this.createRequest({ name: 'delete', path: ':/id', method: 'DELETE' });

    this.entities$ = this.store.select(state =>
      this.getState(state).ids.map(id => this.getState(state).entities[id])
    );
    this.entity$ = this.store.select(
      state => this.getState(state).entityId && this.getState(state).entities[this.getState(state).entityId]
    );
    this.loading$ = this.store.select(
      state => this.getState(state).loading
    );
    this.loaded$ = this.store.select(
      state => this.getState(state).loaded
    );
    this.error$ = this.store.select(
      state => this.getState(state).error
    );
  }

  protected createRequest(requestInfo: RequestInfo) {
    const action = createRequest(this.path, requestInfo.name).type;
    const mapTo = requestInfo.name.toLowerCase();

    Action(createRequest(this.path, requestInfo.name))(this, `${mapTo}Handler`, null);
    Action(createSuccess(this.path, requestInfo.name))(this, `${mapTo}SuccessHandler`, null);
    Action(createFailure(this.path, requestInfo.name))(this, `${mapTo}FailureHandler`, null);

    this.requests[action] = requestInfo;
  }

  protected dispatch(request: string, params?: ParamMap, data?: any) {
    this.store.dispatch(createRequest(this.path, request, { params, data }));
  }

  public query() {
    this.dispatch('query');
  }

  public get(key: IdType | T) {
    this.dispatch('get', { id: this.getKey(key) });
  }

  public create(entity: T): void {
    this.dispatch('post', null, entity);
  }

  public update(entity: Partial<T>): void {
    this.dispatch('put', { id: this.getKey(entity) }, entity);
  }

  public delete(key: IdType | T): void {
    this.dispatch('delete', { id: this.getKey(key) });
  }

  /** Get key from entity (unless arg is already a key) */
  private getKey(arg: any) {
    return typeof arg === 'object' ? this.config.idSelector(arg) : arg;
  }

  private getState(state: any) {
    return state[this.path];
  }

  private getParams(action: any): ParamMap {
    const state = this.store.selectSnapshot(globalState => globalState);
    const params = this.config.subRoutes ? generateParams(state, this.config.subRoutes) : {};

    return { ...action.payload.params, ...params };
  }

  private queryHandler(ctx: StateContext<ApiEntityState<T>>, action: any) {
    const requestInfo = this.requests[action.type];

    ctx.patchState({
      loaded: false,
      loading: true,
      ids: [],
      entities: {},
      entityId: null
    });

    return this.httpClient
      .get(generateUrl(requestInfo, this.config.route, this.getParams(action)))
      .pipe(
        map((entities: T[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(createSuccess(this.config.path, 'query', entities))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(createFailure(this.config.path, 'query', error))
            )
          )
        )
      );
  }

  protected querySuccessHandler(ctx: StateContext<ApiEntityState<T>>, action) {
    const state = ctx.getState();
    ctx.patchState(this.adapter.addAll(action.payload, { ...state, loaded: true, loading: false }));
  }

  protected queryFailureHandler(ctx, action) {
    ctx.patchState({ loaded: false, loading: true, error: action.error });
  }

  protected getHandler(ctx: StateContext<ApiEntityState<T>>, action: any) {
    const requestInfo = this.requests[action.type];

    return this.httpClient
      .get(generateUrl(requestInfo, this.config.route, this.getParams(action)))
      .pipe(
        map((entity: T) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(createSuccess(this.config.path, 'get', entity))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(createFailure(this.config.path, 'get', error))
            )
          )
        )
      );
  }

  protected getSuccessHandler(ctx: StateContext<ApiEntityState<T>>, action) {
    const state = ctx.getState();

    ctx.patchState(
      this.adapter.upsertOne(action.payload, {
        ...state,
        entityId: this.config.idSelector(action.payload)
      })
    );
  }

  protected getFailureHandler(ctx, action) {
    ctx.patchState({ error: action.error });
  }

  protected postHandler(ctx: StateContext<ApiEntityState<T>>, action: any) {
    const requestInfo = this.requests[action.type];

    return this.httpClient
      .post(generateUrl(requestInfo, this.config.route, this.getParams(action)), action.payload.data)
      .pipe(
        map((entity: T) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(createSuccess(this.config.path, 'post', entity))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(createFailure(this.config.path, 'post', error))
            )
          )
        )
      );
  }

  protected postSuccessHandler(ctx: StateContext<ApiEntityState<T>>, action) {
    const state = ctx.getState();

    ctx.patchState(
      this.adapter.addOne(action.payload, state)
    );
  }

  protected postFailureHandler(ctx, action) {
    ctx.patchState({ error: action.error });
  }

  protected putHandler(ctx: StateContext<ApiEntityState<T>>, action: any, name?: string) {
    const requestInfo = this.requests[action.type];

    return this.httpClient
      .put(generateUrl(requestInfo, this.config.route, this.getParams(action)), action.payload.data)
      .pipe(
        map((entity: T) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(createSuccess(this.config.path, name || 'put', entity))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(createFailure(this.config.path, name || 'put', error))
            )
          )
        )
      );
  }

  protected putSuccessHandler(ctx: StateContext<ApiEntityState<T>>, action) {
    const state = ctx.getState();

    ctx.patchState(
      this.adapter.updateOne(this.toUpdate(action.payload), state)
    );
  }

  protected putFailureHandler(ctx, action) {
    ctx.patchState({ error: action.error });
  }

  protected deleteHandler(ctx: StateContext<ApiEntityState<T>>, action: any) {
    const requestInfo = this.requests[action.type];

    return this.httpClient
      .delete(generateUrl(requestInfo, this.config.route, this.getParams(action)))
      .pipe(
        map((entity: T) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(createSuccess(this.config.path, 'delete', entity))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(createFailure(this.config.path, 'delete', error))
            )
          )
        )
      );
  }

  protected deleteSuccessHandler(ctx: StateContext<ApiEntityState<T>>, action) {
    const state = ctx.getState();

    ctx.patchState(
      this.adapter.removeOne(this.getKey(action.payload), state)
    );
  }

  protected deleteFailureHandler(ctx, action) {
    ctx.patchState({ error: action.error });
  }
}
