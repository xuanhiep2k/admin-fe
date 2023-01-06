import * as actionTypes from "../constants/userConstant";

export const getAllUsersReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return {
        loading: true,
        users: []
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        totalElements: action.totalElements,
        totalPages: action.totalPages
      };
    case actionTypes.GET_USERS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};