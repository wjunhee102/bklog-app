import { BaseRestFetch } from "../../../../utils/api-utils";

function authFetchGet(url: string, query?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `auth/${url}`,
    withCredentials: true,
    qs: query
  });
}

function authFetchPost(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "post",
    url: `auth/${url}`,
    withCredentials: true,
    data
  });
}

export default { authFetchPost, authFetchGet };
