import * as actionTypes from "../constants/roleConstant";
import * as RoleService from "../../services/RoleService";

export const getAllRoles = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ROLES_REQUEST
    });
    const { data } = await RoleService.getAllRoles(body);
    dispatch({
      type: actionTypes.GET_ROLES_SUCCESS,
      payload: data.data.content,
      totalElements: data.data.totalElements,
      totalPages: data.data.totalPages
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ROLES_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};