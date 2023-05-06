import { JWT, localStorageConst } from "./local-storage-const";

export const getLocalStorageItem = (key: string) => {
  const item: any = window.localStorage.getItem(key);
  return item !== "undefined" ? JSON.parse(item) : null;
};
export const getToken = () => {
  return window.localStorage.getItem(localStorageConst.ACCESS_TOKEN);
};

export const setLocalStorageItem = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};

// this method do decoding and matching usertoken
export const tokenHandler = (_token: string) => {
  const decodedToken = decodeToken(_token);
  setLocalStorageItem(
    localStorageConst.USER_FULLNAME,
    decodedToken[JWT.NAME_FIELD_CONST]
  );
  setLocalStorageItem(localStorageConst.USER_EMAIL, decodedToken.email);
  setLocalStorageItem(localStorageConst.EXPIRED_TIME, decodedToken.exp);
  setLocalStorageItem(
    localStorageConst.USER_ROLE_CLAIMS,
    decodedToken[JWT.CLAIMS_FIELD_CONST]
  );
  // setLocalStorageItem(localStorageConst.TOKEN, tokenResult.token);
};

const decodeToken = (token: any) => {
  const base64Url: any = token.split(".")[1];
  const base64: any = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};
