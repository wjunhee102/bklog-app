import { UserProfile } from "../../auth/utils";

export const CHANGE_PAGE_TITLE = "page/CHANGE_PAGE_TITLE" as const;
export const CHANGE_TOGGLE = "page/CHANGE_TOGGLE" as const;    

export interface Page {
  pageId: string;
  pageTitle: string;
}


export interface PageState {
  toggle: boolean;
  loading: boolean;
  pageEditor: UserProfile;
  pageList: Page[];
}

