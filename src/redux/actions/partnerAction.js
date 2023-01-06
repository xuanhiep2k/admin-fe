import * as actionTypes from "../constants/partnerConstant";
import * as PartnerService from "../../services/PartnerService";

export const getALlPartners = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_PARTNERS_REQUEST
    });
    const { data } = await PartnerService.getAllPartners(body);
    dispatch({
      type: actionTypes.GET_PARTNERS_SUCCESS,
      payload: data.data.content,
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PARTNERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};