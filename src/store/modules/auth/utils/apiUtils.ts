import { BaseRestFetch } from "../../../../utils/api-utils";

function authFetchGet(url: string, query?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `auth/${url}`,
    qs: query,
    withCredentials: true
  });
}

function authFetchPost(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "post",
    url: `auth/${url}`,
    data,
    withCredentials: true
  });
}

export default { authFetchPost, authFetchGet };
