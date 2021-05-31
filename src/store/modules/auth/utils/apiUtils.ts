import { ResType, RequestArg } from "../../../../utils/api-utils";
import { Rest } from "../../../../utils/api-utils";

const AuthFetch = new Rest("http://localhost:4500/v2");


function authFetchPost (url: string, data: object) {
  return AuthFetch.restApi({
    method: "post",
    url: `auth/${url}`,
    withCredentials: true,
    data
  });

}

async function authFetchGet (url: string, query?: any) {
  return AuthFetch.restApi({
    method: "get",
    url: `auth/${url}`,
    withCredentials: true,
    qs: query
  });

}



const authApiUtils = {
  authFetchPost,
  authFetchGet
}

export default authApiUtils;