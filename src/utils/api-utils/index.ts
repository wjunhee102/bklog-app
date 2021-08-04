import apiUtils    from './apiUtils';
import cookieUtils from './cookieUtils';
import { AxiosRequestConfig } from 'axios';
import api from './api';

export type ResType<T = any> = T;

export interface RequestArg<Data = any , Params = any> {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: Data;
  params?: Params;
  withCredentials?: boolean;
}

export interface ApiErrorType {
  type: string;
  code: string | number;
  message: string;
  detail: string;
}

export interface IRestObject {
  url    : string,
  method : string,
  header?: string,
  qs    ?: any,
  data  ?: any,
  withCredentials?: boolean
}

export interface IGqlObject {
  variables?: object,
  query     : string
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

/**
 * Api
 */
export const Api      = api.Api;
export const Rest     = api.Rest;
export const ApiError = api.ApiError;

const API_SERVER_URL = process.env.NODE_ENV === "production"? "http://27.96.134.8:4500/v2" : "http://localhost:4500/v2";

export const BaseRestFetch = new Rest(API_SERVER_URL);