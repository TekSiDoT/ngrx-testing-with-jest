import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot, cold } from '@nrwl/nx/testing';

import { AppEffects } from './app.effects';
import { SetCookieSuccess, SetJesters, PartyHard, KillParty, SetCookieFailed } from './app.actions';
import { CookieService } from 'ngx-cookie-service';

describe('AppEffects', () => {
  let actions: Observable<any>;
  let effects: AppEffects;
  // tslint:disable-next-line:prefer-const
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        AppEffects,
        DataPersistence,
        provideMockActions(() => actions),
        {
          provide: CookieService,
          useValue: {
            set: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(AppEffects);
    cookieService = TestBed.get(CookieService);
  });

  it('setJester$ should work', () => {
    const action = new SetJesters(25);
    const outcome = new SetCookieSuccess();

    actions = hot('-a-|', { a: action });
    const expected = cold('-b-|', { b: outcome });

    expect(effects.setJester$).toBeObservable(expected);
    expect(cookieService.set).toBeCalledWith('jesters', '25');
  });

  it('partyHard$ should work', () => {
    const action = new PartyHard();
    const outcome = new SetCookieSuccess();

    actions = hot('-a-|', { a: action });
    const expected = cold('-b-|', { b: outcome });

    expect(effects.partyHard$).toBeObservable(expected);
    expect(cookieService.set).toBeCalledWith('jesters', '200');
  });

  it('killParty$ should work', () => {
    const action = new KillParty();
    const outcome = new SetCookieSuccess();

    actions = hot('-a-|', { a: action });
    const expected = cold('-b-|', { b: outcome });

    expect(effects.killParty$).toBeObservable(expected);
    expect(cookieService.set).toBeCalledWith('jesters', '1');
  });

  it('setJester$ should recognize set cookie errors', () => {
    const action = new SetJesters(101);
    const outcome = new SetCookieFailed(new Error('Gimme a reason'));

    cookieService.set = jest.fn(() => {
      throw new Error('Gimme a reason');
    });

    actions = hot('-a-|', { a: action });
    const expected = cold('-b-|', { b: outcome });

    expect(effects.setJester$).toBeObservable(expected);
    expect(cookieService.set).toBeCalledWith('jesters', '101');
  });
});
