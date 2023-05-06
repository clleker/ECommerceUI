import * as actionTypes from "./actionTypes";

export const loginSuccess = (_payload: string) => ({
  type: actionTypes.LOGIN,
  payload: _payload,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT,
});
