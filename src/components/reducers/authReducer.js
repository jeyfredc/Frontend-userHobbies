import { types } from "./types/types.js";

const initialState = {
  error: "",
  token: "",
  logout: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.token:
      return {
        ...state,
        token: action.payload,
      };
    case types.logout:
      return {
        ...state,
        logout: action.payload,
      };
    case types.error:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};