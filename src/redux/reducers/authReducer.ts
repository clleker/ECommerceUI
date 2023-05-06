import { localStorageConst } from "../../utils/local-storage/local-storage-const";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/local-storage/local-storage-utils";
import * as actionTypes from "../actions/actionTypes";
import initialStates from "../initialStates";

export const authReducer = (
  state = initialStates.token,
  action: { type: string; payload: string }
) => {
  let newState;
  switch (action.type) {
    case actionTypes.LOGIN:
      setLocalStorageItem(localStorageConst.ACCESS_TOKEN, action.payload);
      newState = action.payload;
      return newState;
    case actionTypes.LOGOUT:
      removeLocalStorageItem(localStorageConst.ACCESS_TOKEN);
      return null;
    default:
      return state;
  }
};
