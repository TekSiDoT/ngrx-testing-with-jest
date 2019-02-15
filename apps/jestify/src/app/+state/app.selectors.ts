import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, AppState } from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
const getAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

const getJesters = createSelector(
  getAppState,
  (state: AppState) => state.jesters
);

const getPartyHard = createSelector(
  getAppState,
  (state: AppState) => state.partyHard
);

export const appQuery = {
  getJesters,
  getPartyHard
};
