import {
  SET_VIEW,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const toggleBasicAdvanced = showAdvancedView => ({
  type: SET_VIEW,
  advancedView: showAdvancedView,
});
