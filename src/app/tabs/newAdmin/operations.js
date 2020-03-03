import { toggleBasicAdvanced } from './actions';

export const start = () => (dispatch) => {
  const showAdvancedView = localStorage.getItem('adminAdvancedView');
  if (showAdvancedView && showAdvancedView === 'true') {
    dispatch(toggleBasicAdvanced(true));
  }
};

export const toggleBasicAdvancedSwitch = setting => (dispatch) => {
  dispatch(toggleBasicAdvanced(setting));
  localStorage.setItem('adminAdvancedView', setting);
};
