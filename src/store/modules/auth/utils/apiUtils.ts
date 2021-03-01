import { ResType, RequestArg } from "../../../../utils/api-utils";
import { baseFetch } from "../../../../utils/api-utils";

async function authFetchPost(url: string, data: object): Promise<ResType> {
  return await baseFetch({
    method: "post",
    url: `/auth/${url}`,
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