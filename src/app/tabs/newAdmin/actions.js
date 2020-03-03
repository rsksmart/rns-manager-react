import {
  TOGGLE_BASIC_ADVANCED, BASIC_VIEW, ADVANCED_VIEW,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const toggleBasicAdvanced = checked => ({
  type: TOGGLE_BASIC_ADVANCED,
  mode: checked ? ADVANCED_VIEW : BASIC_VIEW,
});
