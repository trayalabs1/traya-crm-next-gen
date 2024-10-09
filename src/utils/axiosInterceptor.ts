import { useAuthStore } from "@components/Login/store/useAuthStore";
import { API_BASE_URL } from "@config/config";
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
  if (import.meta.env.DEV) {
    console.log(message);
  }
};

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
  const { accessToken } = useAuthStore.getState();
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

const onErrorResponse = async (
  error: AxiosError | Error,
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status } = (error.response as AxiosResponse) ?? {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
    );

    const { logout } = useAuthStore.getState();
    if (status === 401) {
      await logout();
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

const client = axios.create({
  baseURL: API_BASE_URL,
});
export const axiosClient = setupInterceptors(client);
