import * as actionTypes from "../constants/roleConstant";

export const getAllRolesReducer = (state = { roles: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES_REQUEST:
      return {
        loading: true,
        roles: []
      };
    case actionTypes.GET_ROLES_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
        totalElements: action.totalElements,
        totalPages: action.totalPages
      };
    case actionTypes.GET_ROLES_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};