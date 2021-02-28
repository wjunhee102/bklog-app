import axios from 'axios';
import { RequestArg, ResType } from './index'; 

const baseURL = "http://localhost:4500/v2";

export async function baseFetch(req: RequestArg): Promise<ResType> {
  try {
    const { data } = await axios(Object.assign({
      baseURL,
      responseType: 'json'
    }, req));

    return data;

  } catch(e) {
    return {
      success: false,
      error: e
    };
  }
}

const apiUtils = {
  baseFetch
}

export default apiUtils;