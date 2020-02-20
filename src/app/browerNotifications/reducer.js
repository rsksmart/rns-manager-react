import { REQUEST_BROWSER_NOTIFICATIONS, RECIEVE_BROWSER_NOTIFICATIONS, DEFAULT } from './types';

const initialState = {
  requesting: false,
  permission: DEFAULT,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BROWSER_NOTIFICATIONS: return {
      ...initialState,
      requesting: action.requesting,
    };
    case RECIEVE_BROWSER_NOTIFICATIONS: return {
      ...initialState,
      requesting: true,
      permission: action.result,
    };
    default: return state;
  }
};
