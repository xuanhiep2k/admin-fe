import * as actionTypes from "../constants/loginConstant";

export const getLoginReducer = (state = { accessToken: "" }, action) => {
  switch (action.type) {
    case actionTypes.GET_LOGIN_REQUEST:
      return {
        loading: true,
        isLoggedIn: false,
        accessToken: ""
      };
    case actionTypes.GET_LOGIN_SUCCESS:
      return {
        loading: false,
        isLoggedIn: true,
        accessToken: action.payload
      };
    case actionTypes.GET_LOGIN_FAIL:
      return {
        loading: false,
        isLoggedIn: false,
        error: action.payload
      };
    default:
      return state;
  }
};