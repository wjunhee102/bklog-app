import axios, { AxiosRequestConfig } from 'axios';

const baseURL = "http://localhost:4500";

type baseFetchType = {
  success: boolean,
  response: any
}; 

async function baseFetch(
  url: string, 
  reqData: any,
  method: AxiosRequestConfig["method"] = "get"
): Promise<baseFetchType> {
  try {
    const response = await axios({
      method: method,
      url,
      data: reqData,
      baseURL,
      responseType: 'json'
    });

    return {
      success: true,
      response
    };

  } catch(e) {
    return {
      success: false,
      response: e
    };
  }
}

const apiUtils = {
  baseFetch
}

export default apiUtils