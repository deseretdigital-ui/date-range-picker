// Actions
export const UPDATE_STATE_VALUE = 'UPDATE_STATE_VALUE';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_STATE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
