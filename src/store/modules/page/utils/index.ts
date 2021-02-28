export type Page = {
  pageId: string;
  pageTitle: string;
}

export interface PageState {
  pageEditor: string,
  pageList: Page[];
}

export const CHANGE_PAGE_TITLE = "page/CHANGE_PAGE_TITLE" as const;