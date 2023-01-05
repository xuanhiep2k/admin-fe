import * as actionTypes from "../constants/partnerConstant";

export const getAllPartnersReducer = (state = { partners: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PARTNERS_REQUEST:
      return {
        loading: true,
        partners: []
      };
    case actionTypes.GET_PARTNERS_SUCCESS:
      return {
        loading: false,
        partners: action.payload,
        totalElements: action.totalElements,
        totalPages: action.totalPages
      };
    case actionTypes.GET_PARTNERS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};