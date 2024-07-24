import { types } from "./types/types.js";

const initialState = {
    users: "",
    error: "",
    addSuccessfully: false,
    deleteSuccessfully: false,
    updateSuccessfully: false,
    edit: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.users:
      return {
        ...state,
        users: action.payload,
      };
    case types.error:
      return {
        ...state,
        error: action.payload,
      };
    case types.addSuccessfully: 
      return {
        ...state,
        addSuccessfully: action.payload,
      };
    case types.deleteSuccessfully:
      return {
        ...state,
        deleteSuccessfully: action.payload,
      };
    case types.updateSuccessfully:
      return {
        ...state,
        updateSuccessfully: action.payload,
      };
      case types.userId:
      return {
        ...state,
        userId: action.payload,
      };
    case types.edit:
      return {
        ...state,
        edit: action.payload,
      };

    default:
      return state;
  }
};