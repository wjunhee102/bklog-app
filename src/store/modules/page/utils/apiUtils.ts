import { createGetRestFetch, createRestFetch } from "../../../../utils/api-utils";

const pageFetchGet = createGetRestFetch("page");

const pageFetchPost = createRestFetch("page", "post");

export default { pageFetchGet, pageFetchPost };
