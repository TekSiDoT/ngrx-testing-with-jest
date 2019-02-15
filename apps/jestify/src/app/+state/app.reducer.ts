import { AppAction, AppActionTypes } from './app.actions';

export const APP_FEATURE_KEY = 'app';

export interface AppState {
  jesters: number;
  partyHard: boolean;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const initialState: AppState = {
  jesters: 1,
  partyHard: false
};

export function appReducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes.SetJesters: {
      state = {
        ...state,
        jesters: action.payload
      };
      break;
    }
    case AppActionTypes.PartyHard: {
      state = {
        ...state,
        jesters: 200,
        partyHard: true
      };
      break;
    }
    case AppActionTypes.KillParty: {
      state = {
        ...state,
        jesters: 1,
        partyHard: false
      };
      break;
    }
  }
  return state;
}
