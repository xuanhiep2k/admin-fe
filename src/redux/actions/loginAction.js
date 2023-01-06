import * as actionTypes from "../constants/loginConstant";
import * as LoginService from "../../services/LoginService";

export const getLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_LOGIN_REQUEST
    });
    const { data } = await LoginService.login({ username, password });
    dispatch({
      type: actionTypes.GET_LOGIN_SUCCESS,
      payload: data.data.accessToken
    });
    localStorage.setItem("accessToken", data.data.accessToken);
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};