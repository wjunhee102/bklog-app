// import axios, { AxiosInstance } from "axios";


export default function Testa() {
  return "test"
}

// export default class Api {
//   private ajax: AxiosInstance = new axios.create();

// }

// import axios, { 
//   AxiosInstance, 
//   AxiosRequestConfig, 
//   AxiosResponse,
//   AxiosError
// } from 'axios';

// import { stringify } from 'qs';

// // gql error 체크를 위해 사용

// export interface IError {
//   status?: number;
//   message: string;
// }

// export default class CustomError  implements IError {
//   status?: number;
//   message: string;

//   constructor (error: IError) {
//     this.status  = error.status;
//     this.message = error.message;
//   }

//   toString (): string {
//     if(this.message) {
//       return this.message;
//     }
//     return "Unknown Error";
//   }
// }

// export interface IRestObject {
//   url    : string,
//   method : string,
//   header?: string,
//   qs    ?: any,
//   data  ?: any
// }

// export interface IGqlObject {
//   variables?: object,
//   query     : string
// }

// export class Api {
//   _ajax  : AxiosInstance;
//   baseUrl: string;

//   constructor (baseUrl: string) {
//     this.baseUrl = baseUrl;

//     this._initializeAjax();
//   }

//   _initializeAjax () {
//     const ajax = axios.create({
//       baseURL: this.baseUrl,
//       // CORS 사용 시 정책적으로 wildcard만 있는 경우 인증 데이터를 사용하지 못하도록 제재
//       // withCredentials: true,
//     });

//     ajax.interceptors.response.use((response: AxiosResponse) => {
//       return response.data;
//     }, (error: AxiosError) => {
//       return Promise.reject([error]);
//     });

//     this._ajax = ajax;
//   }

//   call (ajaxInfo: AxiosRequestConfig): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this._ajax(ajaxInfo)
//       .then((result: any) => {
//         resolve(result);
//       })
//       .catch((error: Array<any>) => {
//         reject(error);
//       });
//     });
//   };
// }

// export class Rest extends Api {

//   constructor (baseUrl: string) {
//     super(baseUrl)
//   }

//   _restConvert (restObject: IRestObject) {
//     return Object.assign({}, restObject, {
//       url: (() => {
//         if (restObject.qs) {
//           return `${restObject.url}${stringify(restObject.qs, { addQueryPrefix: true })}`
//         } else {
//           return restObject.url
//         }
//       })()
//     }) as AxiosRequestConfig;
//   }

//   restApi (restObject: IRestObject): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.call(this._restConvert(restObject))
//       .then((result: AxiosResponse) => {
//         resolve(result);
//       })
//       .catch((error: AxiosError) => {
//         reject(error);
//       })
//     })
//   }
// }

// export class Gql extends Api {

//   constructor (baseUrl: string) {
//     super(baseUrl)
//   }

//   gqlApi (gqlObject: IGqlObject): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.call({
//         url   : 'graphql',
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//         },
//         data: Object.assign({}, {
//           variables: {}
//         }, gqlObject)
//       })
//       .then((result) => { // TODO: GQL 200 ok error response type check
//         // error 케이스
//         if(result.errors && result.errors.length > 0) {
//           reject(result.errors.map((error: any) => {
//             if(error.extensions) {
//               return new CustomError({
//                 status : error.extensions.status,
//                 message: error.extensions.message,
//               });
//             } else {
//               return new CustomError({
//                 message: "System Error"
//               })
//             }
//           }));
//         } else {
//           resolve(result.data);
//         }
//       })
//       .catch((error: AxiosError) => {
//         reject(error);
//       })
//     })
//   }
// }