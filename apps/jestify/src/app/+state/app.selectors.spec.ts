import { appQuery } from './app.selectors';
import { AppState } from './app.reducer';

describe('App Selectors', () => {
  let storeState: {
    app: AppState;
  };

  beforeEach(() => {
    storeState = {
      app: {
        jesters: 100,
        partyHard: true
      }
    };
  });

  describe('App Selectors', () => {
    it('getJesters() should return number of jesters', () => {
      const results = appQuery.getJesters(storeState);
      expect(results).toBe(100);
      expect(results).toMatchSnapshot();
    });

    it('getPartyHard() should return party state', () => {
      const results = appQuery.getPartyHard(storeState);
      expect(results).toMatchSnapshot();
    });
  });
});
