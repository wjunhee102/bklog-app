import apiUtils    from './apiUtils';
import cookieUtils from './cookieUtils';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { stringify } from 'qs';


export type ResType<T = any> = T;

export interface RequestArg<Data = any , Params = any> {
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

export interface ApiErrorType {
  type: string;
  code: string | number;
  message: string;
  detail: string;
}

export class ApiError implements ApiErrorType {
  type: string = "unknown";
  code: string | number = "000";
  message: string = "알 수 없는 오류입니다.";
  detail: string = "unknown";

  constructor() {}

  build(error: any) {
    if(error.type) this.type = error.type;
    if(error.code) this.code = error.code;
    if(error.message) this.message = error.message;
    if(error.detail) this.detail = error.detail;

    return this;
  }

  setType(type: string): ApiError {
    this.type = type;
    return this;
  }

  setCode(code: string | number): ApiError {
    this.code = code;
    return this;
  }

  setMessage(message: string): ApiError {
    this.message = message;
    return this;
  }

  setDetail(detail: string): ApiError {
    this.detail = detail;
    return this;
  } 

  get get(): ApiErrorType {
    return {
      type: this.type,
      code: this.code,
      message: this.message,
      detail: this.detail
    }
  }
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

export class Api {
  _ajax  : AxiosInstance;
  baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
    this._ajax = axios.create({
      baseURL: baseUrl
    })

    this._initializeAjax();
  }

  _initializeAjax () {
    this._ajax.interceptors.response.use((response: AxiosResponse) => {
      return response.data;
    }, (error: AxiosError) => {
      if(error.response) {

        if(error.response.data.error) {
          return Promise.reject(new ApiError().build(error.response.data.error));
        } else {
          return Promise.reject(new ApiError().build(error.response.data));
        }

      } else if (error.request){
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
        return Promise.reject({ 
          message: error.message,
          detail: "response not"
         });
      } else {
        console.log(error);
        return Promise.reject({ message: error.message });
      }
    });
  }

  call (ajaxInfo: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this._ajax(ajaxInfo)
      .then((result: any) => {
        resolve(result);
      })
      .catch((error: ApiError) => {
        reject(error);
      });
    });
  };
}

export class Rest extends Api {

  constructor (baseUrl: string) {
    super(baseUrl)
  }

  _restConvert (restObject: IRestObject) {
    return Object.assign({}, restObject, {
      url: (() => {
        if (restObject.qs) {
          return `${restObject.url}${stringify(restObject.qs, { addQueryPrefix: true })}`
        } else {
          return restObject.url
        }
      })()
    }) as AxiosRequestConfig;
  }

  restApi (restObject: IRestObject): Promise<any> {
    return new Promise((resolve, reject) => {
      this.call(this._restConvert(restObject))
      .then((result: AxiosResponse) => {
        resolve(result);
      })
      .catch((error: any) => {
        reject(error);
      })
    })
  }
}

