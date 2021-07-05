import { BaseRestFetch } from "../../../../utils/api-utils";

function bklogFetchGet(url: string, query?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `bklog/${url}`,
    withCredentials: true,
    qs: query
  });
}

function bklogFetchPost(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "post",
    url: `bklog/${url}`,
    withCredentials: true,
    data
  });
}

export default { bklogFetchGet, bklogFetchPost };