import * as actionTypes from "../constants/functionConstant";
import * as FunctionService from "../../services/FunctionService";

export const getALlFunctions = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_FUNCTIONS_REQUEST
    });
    const { data } = await FunctionService.getTree(body);
    dispatch({
      type: actionTypes.GET_FUNCTIONS_SUCCESS,
      payload: data.data.content,
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FUNCTIONS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};