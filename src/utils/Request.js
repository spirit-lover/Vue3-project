import axios from "axios";
import { ElLoading } from "element-plus";
import message from "@/utils/Message.js";
import router from "@/router/index.js";

//请求头的三种类型
const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const contentTypeFile = "multipart/form-data";

const request = (config) => {
  let { url, params, dataType, showLoading } = config;
  //初始化请求头
  dataType = dataType ? "form" : dataType;
  showLoading = showLoading ? true : showLoading;

  let contentType = contentTypeForm;
  //判断是何种数据类型 默认表单
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
  //创建axios请求
  const instants = axios.create({
    baseURL: "api",
    timeout: 10 * 1000,
    headers: {
      "content-Type": contentType,
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  let loading = null;
  //请求前拦截
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
      message.error("发送请求失败");
      return Promise.reject("发送请求失败");
    },
  );
  //请求后拦截
  instants.interceptors.response.use(
    (response) => {
      if (showLoading && loading) {
        loading.close();
      }
      const responseDate = response.data;
      if (responseDate.status === "error") {
        if (config.errorCallback) {
          config.errorCallback();
        }

        return Promise.reject(responseDate.info);
      } else {
        if (responseDate.code === 200) {
          return responseDate;
        } else if (responseDate.code === 901) {
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          return Promise.reject("登录超时");
        }
      }
    },
    (error) => {
      if (showLoading && loading) {
        loading.close();
      }
      return Promise.reject("网络异常");
    },
  );

  return instants.post(url, params).catch((error) => {
    message.error(error);
    return null;
  });
};

export default request;
