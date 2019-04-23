const initialState = {
  getting: false,
  value: null,
  editOpen: false,
  editting: false
}
export const fieldReducer = field => (state = initialState, action) => {
  switch (action.type) {
    case field.REQUEST_GET: return {
      ...state,
      getting: true,
      value: null
    };
    case field.RECEIVE_GET: return {
      ...state,
      getting: false,
      value: action.value
    };
    case field.CHANGE_EDIT: return {
      ...state,
      editOpen: !state.editOpen
    };
    case field.REQUEST_SET: return {
      ...state,
      editting: true
    };
    case field.RECEIVE_SET: return {
      ...state,
      editting: false
    }
    default: return state;
  }
};
