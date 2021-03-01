import apiUtils    from './apiUtils';
import cookieUtils from './cookieUtils';
import { AxiosRequestConfig } from 'axios';


export type ResType<T = any> = T & {
  success: boolean;
  error?: any;
};

export type RequestArg<Data = any , Params = any> = {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: Data;
  params?: Params;
  withCredentials?: boolean;
}

/**
 * Api Utils
 */
export const baseFetch = apiUtils.baseFetch;

/**
 * Cookie Utils
 */
export const getCookie = cookieUtils.getCookie;
export const getCookieList = cookieUtils.getCookieList;

