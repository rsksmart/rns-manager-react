import configureMockStore from 'redux-mock-store';

const mockStore = (languages) => {
  const mock = configureMockStore([]);
  const initialState = {
    multilanguage: {
      currentLanguageCode: 'en',
      languages: {
        en: languages,
      },
    },
  };
  return mock(() => initialState);
};

export default mockStore;
