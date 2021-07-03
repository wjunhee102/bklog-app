import axios from 'axios';
import { RequestArg, ResType } from './index'; 

const baseURL = "http://localhost:4500/v2";

async function baseFetch(req: RequestArg): Promise<ResType> {
  // try {

  //   const data = await axios(Object.assign({baseURL, responseType: "json"}, req));
    
  //   console.log(data);

  //   return data;

  // } catch(e) {

  //   return Promise.reject(e);
  // }
}

const apiUtils = {
  baseFetch
}

export default apiUtils;