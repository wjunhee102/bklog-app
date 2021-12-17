import { BaseRestFetch } from "../../../../utils/api-utils";

function authFetchGet(url: string, qs?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `auth/${url}`,
    qs,
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

function authFetchDelete(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "delete",
    url: `auth/${url}`,
    data,
    withCredentials: true
  });
}

export default { authFetchPost, authFetchGet, authFetchDelete };
