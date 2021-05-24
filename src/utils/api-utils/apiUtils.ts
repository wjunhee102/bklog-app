import axios, { 
  AxiosInstance, 
  AxiosResponse, 
  AxiosRequestConfig,
  AxiosError 
} from 'axios';
import { stringify } from 'qs';
import { RequestArg, ResType } from './index'; 

const baseURL = "http://localhost:4500/v2";

async function baseFetch(req: RequestArg): Promise<ResType> {
  try {

    const data = await axios(Object.assign({baseURL, responseType: "json"}, req));
    
    console.log(data);

    return data;

  } catch(e) {
    // return {
    //   data: {
    //     success: false,
    //     error: e.response.data
    //   }
    // };
    return Promise.reject(e);
  }
}

// function baseFetch(req: RequestArg): Promise<ResType> {
//   try {
//     const res = await axios(Object.assign(baseURL, responseType: "json"))
//   }
// }

const apiUtils = {
  baseFetch
}

export default apiUtils;


// 여기서 access token 관리하는게 좋을 것 같음.
// async function baseFetch2(req: RequestArg) : Promise<ResType> {
//   try {
//     const data = await axios(Object.assign({baseURL, responseType: "json"}, req));

//     if(data.success = false){
//       return {
//         suc
//       }
//     }

//   }
// }

// class Api {
//   private baseUrl: string;
//   private _ajax: AxiosInstance;
  
//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;
//     this._ajax = axios.create({
//       baseURL: this.baseUrl
//     });

//     this._initializeAjax();
//   }

//   _initializeAjax() {
//     this._ajax.interceptors.response.use((response: AxiosResponse) => {
//       return response.data;
//     }, (error: AxiosError) => {
//       return Promise.reject([error]);
//     });
//   }
// }


// gql error 체크를 위해 사용

export interface IError {
  status?: number;
  message: string;
}

class CustomError  implements IError {
  status?: number;
  message: string;

  constructor (error: IError) {
    this.status  = error.status;
    this.message = error.message;
  }

  toString (): string {
    if(this.message) {
      return this.message;
    }
    return "Unknown Error";
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
          return Promise.reject(error.response.data.error);
        } else {
          return Promise.reject(error.response.data);
        }

      } else if (error.request){
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
        return Promise.reject({ message: error.message });
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
      .catch((error: any) => {
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
      .catch((error: AxiosError) => {
        reject(error);
      })
    })
  }
}