import axios from 'axios';
import { RequestArg, ResType } from './index'; 

const baseURL = "http://localhost:4500/v2";

async function baseFetch(req: RequestArg): Promise<ResType> {
  try {

    const data = await axios(Object.assign({baseURL, responseType: "json"}, req));
    
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