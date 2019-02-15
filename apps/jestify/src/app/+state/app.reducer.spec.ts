import { PartyHard, SetJesters } from './app.actions';
import { AppState, initialState, appReducer } from './app.reducer';

describe('App Reducer', () => {
  beforeEach(() => {});

  describe('valid App actions ', () => {
    it('should properly set jesters', () => {
      const action = new SetJesters(1);
      const result = appReducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should properly set MANY jesters', () => {
      const action = new SetJesters(1000);
      const result = appReducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should properly party', () => {
      const action = new PartyHard();
      const result = appReducer(initialState, action);
      const expectedResult: AppState = {
        partyHard: true,
        jesters: 200
      };
      expect(result).toEqual(expectedResult);
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = appReducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
});
