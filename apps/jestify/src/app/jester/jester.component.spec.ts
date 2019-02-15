import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { appReducer, initialState, AppState } from '../+state/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../+state/app.effects';
import { AppFacade } from '../+state/app.facade';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { readFirst } from '@nrwl/nx/testing';
import { JesterComponent } from './jester.component';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';
import { CookieService } from 'ngx-cookie-service';

interface TestSchema {
  app: AppState;
}

describe('Jester Component', () => {
  let facade: AppFacade;
  let component: JesterComponent;
  let fixture: ComponentFixture<JesterComponent>;

  beforeEach(() => {
    @NgModule({
      imports: [
        CommonModule,
        SafePipeModule,
        StoreModule.forFeature('app', appReducer, { initialState }),
        EffectsModule.forFeature([AppEffects])
      ],
      providers: [AppFacade, CookieService],
      declarations: [JesterComponent]
    })
    class CustomFeatureModule {}

    @NgModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      providers: [AppFacade]
    })
    class RootModule {}
    TestBed.configureTestingModule({ imports: [RootModule] }).compileComponents();

    facade = TestBed.get(AppFacade);

    fixture = TestBed.createComponent(JesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the jester component', async done => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
    done();
  });

  it('should check the initial width range', async done => {
    expect(fixture.componentInstance.width).toBeGreaterThanOrEqual(30);
    expect(fixture.componentInstance.width).toBeLessThanOrEqual(100);
    done();
  });

  it('has correct initial selector states', async done => {
    try {
      const jesters = await readFirst(facade.jesters$);
      expect(jesters).toMatchSnapshot();

      const partyHard = await readFirst(facade.partyHard$);
      expect(partyHard).toMatchSnapshot();

      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
