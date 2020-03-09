import {
  toggleBasicAdvanced,
} from './actions';

export const start = () => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  dispatch(toggleBasicAdvanced(showAdvancedView === 'true'));
};

export const toggleBasicAdvancedSwitch = showAdvancedView => (dispatch) => {
  dispatch(toggleBasicAdvanced(showAdvancedView));
  localStorage.setItem('adminAdvancedView', showAdvancedView);
};
