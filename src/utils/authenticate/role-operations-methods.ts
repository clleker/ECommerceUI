import { localStorageConst } from "../local-storage/local-storage-const";
import { getLocalStorageItem } from "../local-storage/local-storage-utils";

export const userHasPermission = (role: string) => {
  const userRoleClaims = getLocalStorageItem(
    localStorageConst.USER_ROLE_CLAIMS
  );
  if (userRoleClaims) {
    if (Array.isArray(userRoleClaims)) {
      return userRoleClaims.some((userRole: string) => role === userRole);
    }
    return userRoleClaims == role;
  }
};
//9----3
