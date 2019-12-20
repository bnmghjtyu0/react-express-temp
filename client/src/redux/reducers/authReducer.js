const initialState = {
  toggle: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        toggle: action.toggle
      };
    default:
      return state;
  }
};

export default authReducer;
