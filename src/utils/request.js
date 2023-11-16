import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";

const contentTypeForm = "";
const contentTypeJson = "application/json";
const contentTypeFile = "";

const request = (config) => {
  let { url, params, dataType, showLoading } = config;
  dataType = dataType ? "form" : dataType;
  showLoading = showLoading ? true : showLoading;

  let contentType = contentTypeForm;

  if (dataType === "json") {
    contentType = contentTypeJson;
  } else if (dataType === "file") {
    contentType = contentTypeFile;
    let param = new FormData();
    for (let key in params) {
      params.append(key, params[key]);
    }
    params = param;
  }

  const instants = axios.create({
    baseURL: "",
    timeout: 10 * 1000,
    headers: {
      "content-Type": contentType,
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  let loading = null;

  instants.interceptors.request.use(
    (config) => {
      if (showLoading) {
        ElLoading.service({
          lock: true,
          text: "Loading",
          background: "rgba(0,0,0,0.7)",
        });
      }
      return config;
    },
    (error) => {
      if (showLoading && loading) {
        loading.close();
      }
      ElMessage({
        message: "发送请求失败",
        type: "error",
      });
      return Promise.reject("发送请求失败");
    },
  );

  instants.interceptors.response.use(
    (response) => {
      if (showLoading && loading) {
        loading.close();
      }

      const responseDate = response.data;
    },
    (error) => {
      if (showLoading && loading) {
        loading.close();
      }
      return Promise.reject("网络异常");
    },
  );

  return instants.post(url, params).catch((error) => {
    ElMessage({
      message: error,
      type: "error",
    });
    return null;
  });
};

export default request;
