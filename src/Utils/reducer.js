// Actions
export const UPDATE_STATE_VALUE = 'UPDATE_STATE_VALUE';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_STATE_VALUE:
      console.log({
        action,
        newState: {
          ...state,
          [action.name]: action.value,
        },
      });
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
