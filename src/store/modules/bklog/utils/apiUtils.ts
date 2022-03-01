import { createAllRestFetch } from "../../../../utils/api-utils";

const bklogFetch = createAllRestFetch("bklog");

export default { 
  bklogFetchGet: bklogFetch.getFetch, 
  bklogFetchPost: bklogFetch.postFetch, 
  bklogFetchPut: bklogFetch.putFetch,
  bklogFetchPatch: bklogFetch.patchFetch,
  bklogFetchDelete: bklogFetch.deleteFetch
};