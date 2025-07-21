import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 全局 loading 变量
let loadingCount = 0;
const showLoading = () => {
  loadingCount++;
  // 这里用 alert 仅做演示，实际项目可用全局 loading 组件
  if (loadingCount === 1) {
    // window.showGlobalLoading();
    console.log("Loading...");
  }
};
const hideLoading = () => {
  loadingCount = Math.max(loadingCount - 1, 0);
  if (loadingCount === 0) {
    // window.hideGlobalLoading();
    console.log("Loading end");
  }
};

// 获取 token
const getToken = () => localStorage.getItem("token");
// 刷新 token（示例，需根据实际接口实现）
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};
const refreshToken = async () => {
  // 假设有 refresh_token
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;
  // 实际项目应调用刷新 token 的接口
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL || ""}/auth/refresh-token`,
    { refresh_token }
  );
  if (res.data.code === 0) {
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("refresh_token", res.data.data.refresh_token);
    return res.data.data.token;
  }
  return null;
};

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    showLoading();
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoading();
    // 假设后端返回格式 { code: 0, data: ..., msg: "" }
    if (response.data && response.data.code !== undefined) {
      if (response.data.code !== 0) {
        window.alert(response.data.msg || "请求出错");
        return Promise.reject(response.data);
      }
      return response.data.data;
    }
    return response.data;
  },
  async (error) => {
    hideLoading();
    const { config, response } = error;
    // 自动重试机制（仅对网络错误或 5xx 错误）
    const shouldRetry = !config.__isRetryRequest && (!response || response.status >= 500);
    if (shouldRetry) {
      config.__isRetryRequest = true;
      return service(config);
    }
    // token 过期自动刷新
    if (response && response.status === 401 && !config.__isRetryRequest) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          if (newToken) {
            onRefreshed(newToken);
            isRefreshing = false;
            config.headers.Authorization = `Bearer ${newToken}`;
            config.__isRetryRequest = true;
            return service(config);
          } else {
            window.alert("登录已过期，请重新登录");
            // window.location.href = "/login";
            return Promise.reject(error);
          }
        } catch (e) {
          isRefreshing = false;
          return Promise.reject(e);
        }
      } else {
        // 队列等待 token 刷新
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            config.__isRetryRequest = true;
            resolve(service(config));
          });
        });
      }
    }
    // 统一处理 HTTP 错误
    if (response) {
      const status = response.status;
      if (status === 401) {
        window.alert("登录已过期，请重新登录");
        // window.location.href = "/login";
      } else if (status === 500) {
        window.alert("服务器错误，请稍后再试");
      } else {
        window.alert(response.data?.message || "请求失败");
      }
    } else {
      window.alert("网络异常，请检查网络连接");
    }
    return Promise.reject(error);
  }
);

const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return service(config);
};

export default request; 