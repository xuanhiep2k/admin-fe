import * as actionTypes from "../constants/appConstant";
import * as AppService from "../../services/AppService";

export const getALlApps = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_APPS_REQUEST
    });
    const { data } = await AppService.getAllApps(body);
    dispatch({
      type: actionTypes.GET_APPS_SUCCESS,
      payload: data.data.content,
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_APPS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};