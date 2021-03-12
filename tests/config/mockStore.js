import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import english from '../../src/languages/en.json';

const mockStore = (languages, initialState) => {
  const mock = configureMockStore([thunk]);
  const state = {
    ...initialState,
    multilanguage: {
      currentLanguageCode: 'en',
      languages: {
        en: languages,
      },
    },
  };
  return mock(() => state);
};

// can be used when not using snapshot testing
export const mockStoreEnglish = initialState => mockStore(english, initialState);

export default mockStore;
