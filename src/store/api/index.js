import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import {API_URL} from '../../utils/constants';

axios.interceptors.request.use(
  async config => {
    try {
      AxiosLogger.requestLogger(config);
    } catch (error) {
      AxiosLogger.errorLogger(error);
      console.error(error);
    } finally {
      return config;
    }
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger,
);

export const artworks = () => axios.get(`${API_URL.ARTWORKS_API}`);

export const beer = () => axios.get(`${API_URL.BEER_API}`);

export const books = () => axios.get(`${API_URL.BOOKS_API}`);

export const makeup = () => axios.get(`${API_URL.MAKEUP_API}`);
