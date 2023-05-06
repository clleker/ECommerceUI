import { localStorageConst } from "../utils/local-storage/local-storage-const";

export default {
  token: localStorage.getItem(localStorageConst.ACCESS_TOKEN),
};
