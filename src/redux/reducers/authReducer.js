import * as actionTypes from "../constants/authConstant";

export const getAuthReducer = (state = { isAuth: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_AUTH_REQUEST:
      return {
        loading: true,
        isAuth: []
      };
    case actionTypes.GET_AUTH_SUCCESS:
      return {
        loading: false,
        isAuth: action.payload
      };
    case actionTypes.GET_AUTH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};