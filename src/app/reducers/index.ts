import { getSelectors, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

export interface State {
  router: RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  RouterReducerState<any>
>('router');

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const {
    selectQueryParams,    // select the current route query params
    selectRouteParams,    // select the current route params
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
  } = getSelectors(selectRouter);
