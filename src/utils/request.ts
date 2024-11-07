import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 基础 URL
  timeout: 5000, // 请求超时设置
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 在请求发送之前做些什么，例如添加 token
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type ErrorCodeHandler = (res: any) => void;
type HttpErrorCodeHandler = () => void;

const errorCode: Record<number, ErrorCodeHandler> = {
  10: (res) => {
    const { msg } = res.data;
    console.log(msg || "10状态码");
  },
  100: () => {
    console.log("100状态码");
  },
};

const httpErrorCode: Record<number, HttpErrorCodeHandler> = {
  401: () => {
    console.log("401状态码");
  },
  403: () => {
    console.log("403状态码");
  },
  404: () => {
    console.log("404状态码");
  },
  500: () => {
    console.log("500状态码");
  },
};

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // 对响应数据做点什么
    const { code } = response.data;
    if (code === 0) {
      return response.data.data;
    }
    errorCode[code]?.(response);
    return Promise.reject(response);
  },
  (error: AxiosError<any>) => {
    if (error.status) {
      httpErrorCode[error.status]?.();
    }
    return Promise.reject(error);
  }
);

export default request;
