import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { processErrorHandle } from './process-error-handle';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse): boolean => !!StatusCodeMapping[response.status];

const BASE_URL = 'https://10.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        const headers = config.headers instanceof AxiosHeaders ? config.headers : new AxiosHeaders(config.headers);
        headers.set('x-token', token);

        config.headers = headers;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        const errorMessage = (error.response.data as { error?: string }).error || 'Unknown error';
        processErrorHandle(errorMessage);
      }

      throw error;
    },
  );

  return api;
};


