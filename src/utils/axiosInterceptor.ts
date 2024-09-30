import { DEFAULT_AXIOS_TIMEOUT } from "@constants/constants";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (import.meta.env.MODE === "development") {
    console.log(message);
  }
};

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  // const accessToken = localStorage.getItem("token")
  const accessToken = import.meta.env.VITE_TEMPORARY_TOKEN;

  if (accessToken) config.headers.setAuthorization("Bearer " + accessToken);

  if (method === "get") {
    config.timeout = DEFAULT_AXIOS_TIMEOUT;
  }
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status } = (error.response as AxiosResponse) ?? {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
    );

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return instance;
};

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL });
export const axiosClient = setupInterceptors(client);
