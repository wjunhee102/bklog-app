import { BaseRestFetch } from ".";

const createGetRestFetch = (basePath: string) => {
  return (path: string, query?: object) => BaseRestFetch.restApi({
    method: "get",
    url: `${basePath}/${path}`,
    withCredentials: true,
    qs: query
  });
}

const createRestFetch = (basePath: string, method: string) => {
  return (path: string, data?: object, query?: object) => BaseRestFetch.restApi({
    method,
    url: `${basePath}/${path}`,
    withCredentials: true,
    data,
    qs: query
  });
}

const createAllRestFetch = (basePath: string) => {
  return {
    getFetch: createGetRestFetch(basePath),
    postFetch: createRestFetch(basePath, "post"),
    putFetch: createRestFetch(basePath, "put"),
    patchFetch: createRestFetch(basePath, "patch"),
    deleteFetch: createRestFetch(basePath, "delete")
  }
}

export default {
  createGetRestFetch,
  createRestFetch,
  createAllRestFetch
}