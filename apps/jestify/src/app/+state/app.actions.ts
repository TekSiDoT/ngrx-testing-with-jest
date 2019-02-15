import { Action } from '@ngrx/store';

export enum AppActionTypes {
  SetJesters = '[App] Set Jesters',
  PartyHard = '[App] Party Hard',
  KillParty = '[App] Kill the Party',
  SetCookieSuccess = '[App] Set Cookie Success',
  SetCookieFailed = '[App] Set Cookie Failed'
}

export class SetJesters implements Action {
  readonly type = AppActionTypes.SetJesters;
  constructor(public payload: number) {}
}

export class PartyHard implements Action {
  readonly type = AppActionTypes.PartyHard;
}

export class KillParty implements Action {
  readonly type = AppActionTypes.KillParty;
}

export class SetCookieSuccess implements Action {
  readonly type = AppActionTypes.SetCookieSuccess;
}

export class SetCookieFailed implements Action {
  readonly type = AppActionTypes.SetCookieFailed;
  constructor(public payload?: Error) {}
}

export type AppAction = SetJesters | PartyHard | KillParty | SetCookieSuccess | SetCookieFailed;

export const fromAppActions = {
  SetJesters,
  PartyHard,
  KillParty,
  SetCookieSuccess
};
