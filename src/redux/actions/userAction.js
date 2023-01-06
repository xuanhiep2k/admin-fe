import * as actionTypes from "../constants/userConstant";
import * as UserService from "../../services/UserService";

export const getALlUsers = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST
    });
    const { data } = await UserService.getAllUsers(body);
    dispatch({
      type: actionTypes.GET_USERS_SUCCESS,
      payload: data.data.content,
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USERS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};