import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AppPartialState } from './app.reducer';
import { appQuery } from './app.selectors';
import { PartyHard, KillParty, SetJesters } from './app.actions';

@Injectable()
export class AppFacade {
  jesters$ = this.store.pipe(select(appQuery.getJesters));
  partyHard$ = this.store.pipe(select(appQuery.getPartyHard));

  constructor(private store: Store<AppPartialState>) {}

  setJesters(payload: number) {
    this.store.dispatch(new SetJesters(payload));
  }

  partyHard() {
    this.store.dispatch(new PartyHard());
  }

  killParty() {
    this.store.dispatch(new KillParty());
  }
}
