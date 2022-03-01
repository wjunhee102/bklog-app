import cookieUtils from './cookieUtils';
import { AxiosRequestConfig } from 'axios';
import api from './api';
import createFetch from './createFetch';

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

export const API_SERVER_URL: string = (process && process.env && process.env.REACT_APP_API_URL)? process.env.REACT_APP_API_URL : "http://localhost:4500/v2";
export const SOCKET_URL: string = (process && process.env && process.env.REACT_APP_SOCKET_URL)? process.env.REACT_APP_SOCKET_URL: "http://localhost:4500/bklog";

export const BaseRestFetch = new Rest(API_SERVER_URL);

export const createRestFetch    = createFetch.createRestFetch;
export const createGetRestFetch = createFetch.createGetRestFetch;
export const createAllRestFetch = createFetch.createAllRestFetch;