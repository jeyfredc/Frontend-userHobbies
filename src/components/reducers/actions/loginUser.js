import { types } from "../../reducers/types/types";

import { token, url } from "../../../config/env";
import { peticion } from "../../../helpers/request";
import Swal from "sweetalert2";

export const getToken = (data) => {
  // console.log(data);
  return async (dispatch) => {
    const endpoint = `${url}${token}`;
    try {
      const resp = await peticion(endpoint, "POST", data);
      const respJson = await resp.json();
      if (respJson.access) {
        dispatch({
          type: types.token,
          payload: respJson.access,
        });
        dispatch({
          type: types.logout,
          payload: true,
        });
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(respJson.access));
        localStorage.setItem("logout", JSON.stringify(true));
      } else {
        dispatch({
          type: types.error,
          payload: "error",
        });
      }
    } catch (error) {
      dispatch({
        type: types.error,
        payload: "error",
      });
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch data. Please check your network connection and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: types.logout,
      payload: false,
    });
    dispatch({
      type: types.users,
      payload: [],
    });
    dispatch({
      type: types.token,
      payload: "",
    });
  };
};
