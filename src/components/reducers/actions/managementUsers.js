import { types } from "../../reducers/types/types";
import {
  allPerson,
  createPerson,
  deletePersonById,
  editPersonById,
  url,
} from "../../../config/env";
import { peticion, peticionGET } from "../../../helpers/request";
import { getToken } from "./loginUser";
import Swal from "sweetalert2";

export const getAllUsers = (token) => {
  return async (dispatch) => {
    try {
      const endpoint = `${url}${allPerson}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const resp = await peticionGET(endpoint, "GET", headers);
      if (resp.status === 401) {
        dispatch(getToken(JSON.parse(localStorage.getItem("data"))));
        localStorage.setItem("logout", JSON.stringify(false));
        return;
      }
      const respJson = await resp.json();
      if (respJson) {
        dispatch({
          type: types.users,
          payload: respJson,
        });
        localStorage.setItem("users", JSON.stringify(respJson));
      } else {
        dispatch({
          type: types.error,
          payload: "error",
        });
      }
    } catch (error) {
      dispatch({
        type: types.error,
        payload: error.message,
      });
    }
  };
};

export const editPerson = (id, data, token) => {
  const endpoint = `${url}${editPersonById}${id}`;
  return async (dispatch) => {
    try {
      const resp = await peticion(endpoint, "PUT", data, token);
      const respJson = await resp.json();
      if (!respJson.error) {
        Swal.fire({
          title: "Success!",
          text: "User updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        dispatch({
          type: types.updateSuccessfully,
          payload: true,
        });
        dispatch({
          type: types.userId,
          payload: id,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch data. Please check your network connection and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};

export const deletePerson = (id, token) => {
  const endpoint = `${url}${deletePersonById}${id}`;
  return async (dispatch) => {
    try {
      const resp = await peticion(endpoint, "DELETE", "", token);
      const respJson = await resp.json();
      if (!respJson.error) {
        Swal.fire({
          title: "Success!",
          text: respJson.description,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      dispatch({
        type: types.deleteSuccessfully,
        payload: true,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch data. Please check your network connection and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};

export const addPerson = (data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return async (dispatch) => {
    try {
      const endpoint = `${url}${createPerson}`;
      const resp = await peticion(endpoint, "POST", data, headers);
      const respJson = await resp.json();
      if (!respJson.error) {
        Swal.fire({
          title: "Success!",
          text: "User added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        dispatch({
          type: types.addSuccessfully,
          payload: true,
        });
        dispatch({
          type: types.userId,
          payload: respJson.id,
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: respJson.description,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch data. Please check your network connection and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
};
