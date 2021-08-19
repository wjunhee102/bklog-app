import { BaseRestFetch } from "../../../../utils/api-utils";

function userFetchGet(url: string, qs?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `user/${url}`,
    qs,
    withCredentials: true
  });
}

function userFetchPost(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "post",
    url: `user/${url}`,
    data,
    withCredentials: true
  });
}

export default { userFetchGet, userFetchPost };
