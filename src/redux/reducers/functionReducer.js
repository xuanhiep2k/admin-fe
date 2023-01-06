import * as actionTypes from "../constants/functionConstant";

export const getAllFunctionsReducer = (state = { functions: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_FUNCTIONS_REQUEST:
      return {
        loading: true,
        functions: []
      };
    case actionTypes.GET_FUNCTIONS_SUCCESS:
      return {
        loading: false,
        functions: action.payload,
        totalElements: action.totalElements,
        totalPages: action.totalPages
      };
    case actionTypes.GET_FUNCTIONS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};