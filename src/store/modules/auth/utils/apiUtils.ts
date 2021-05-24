import { ResType, RequestArg } from "../../../../utils/api-utils";
import { baseFetch } from "../../../../utils/api-utils";
import { Rest } from "../../../../utils/api-utils/apiUtils";

const AuthFetch = new Rest("http://localhost:4500/v2");

function authFetchPost(url: string, data: object): Promise<ResType> {
    // return baseFetch({
    //   method: "post",
    //   url: `/auth/${url}`,
    //   withCredentials: true,
    //   data
    // });
  

  return AuthFetch.restApi({
    method: "post",
    url: `auth/${url}`,
    withCredentials: true,
    data
  })

}

async function authFetchGet(url: string): Promise<ResType> {
  return await baseFetch({
    method: "get",
    url: `auth/${url}`,
    withCredentials: true
  })
}



const authApiUtils = {
  authFetchPost,
  authFetchGet
}

export default authApiUtils;