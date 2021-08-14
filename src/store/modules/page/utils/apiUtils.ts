import { BaseRestFetch } from "../../../../utils/api-utils";

function pageFetchGet(url: string, query?: any) {
  return BaseRestFetch.restApi({
    method: "get",
    url: `page/${url}`,
    withCredentials: true,
    qs: query
  });
}

function pageFetchPost(url: string, data: object) {
  return BaseRestFetch.restApi({
    method: "post",
    url: `page/${url}`,
    withCredentials: true,
    data
  });
}

export default { pageFetchGet, pageFetchPost };
