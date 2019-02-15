import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AppPartialState, APP_FEATURE_KEY } from './app.reducer';
import { AppActionTypes, PartyHard, KillParty, SetJesters, SetCookieSuccess, SetCookieFailed } from './app.actions';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AppEffects {
  @Effect() setJester$ = this.dataPersistence.fetch(AppActionTypes.SetJesters, {
    run: (action: SetJesters, state: AppPartialState) => {
      this.cookieService.set('jesters', action.payload.toString());
      return new SetCookieSuccess();
    },
    onError: (action: SetJesters, error) => {
      return new SetCookieFailed(error);
    }
  });

  @Effect() partyHard$ = this.dataPersistence.fetch(AppActionTypes.PartyHard, {
    run: (action: PartyHard, state: AppPartialState) => {
      this.cookieService.set('jesters', '200');
      return new SetCookieSuccess();
    },
    onError: (action: PartyHard, error) => {
      return new SetCookieFailed();
    }
  });

  @Effect() killParty$ = this.dataPersistence.fetch(AppActionTypes.KillParty, {
    run: (action: KillParty, state: AppPartialState) => {
      this.cookieService.set('jesters', '1');
      return new SetCookieSuccess();
    },
    onError: (action: KillParty, error) => {
      return new SetCookieFailed();
    }
  });

  constructor(
    private actions$: Actions,
    private cookieService: CookieService,
    private dataPersistence: DataPersistence<AppPartialState>
  ) {}
}
