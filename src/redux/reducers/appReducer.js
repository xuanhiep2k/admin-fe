import * as actionTypes from "../constants/appConstant";

export const getAllAppsReducer = (state = { apps: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_APPS_REQUEST:
      return {
        loading: true,
        apps: []
      };
    case actionTypes.GET_APPS_SUCCESS:
      return {
        loading: false,
        apps: action.payload,
        totalElements: action.totalElements,
        totalPages: action.totalPages
      };
    case actionTypes.GET_APPS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};