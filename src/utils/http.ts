import { message } from "antd";
import axios from "axios";
import {
  getLocalStorageItem,
  getToken,
} from "./local-storage/local-storage-utils";
// import { getToken } from "./get-token";

//Use "application/json"for all datas except IFormFile    Sadece Json File Dosyası Hariç tüm veriler için  application/json   dosyası kullan.
//Use "multipart/form-data;" for "IFormFile" .Also you have to use "const formData = new FormData()"

const http = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    // config.data = {};
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    message.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default http;
