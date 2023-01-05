import { getCurrentUserInfo } from "../../services/UserService";
import { getFunctionByRoleCode } from "../../services/FunctionService";
import * as actionTypes from "../constants/authConstant";

export const getAuth = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_AUTH_REQUEST
    });
    const functionCodes = [];
    const userCurrent = await getCurrentUserInfo();
    const functions = await getFunctionByRoleCode(userCurrent.data.data.roles);
    functions.data.data.map(func => {
      functionCodes.push(func.code);
    });
    dispatch({
      type: actionTypes.GET_AUTH_SUCCESS,
      payload: functionCodes.join(",")
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AUTH_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};