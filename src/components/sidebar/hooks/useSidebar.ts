import { useEffect, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";
import useSocket from "../../../hooks/useSocket";
import { Page } from "../../../store/modules/page/utils";
import { SOCKET_URL } from "../../../utils/api-utils";

export interface PageListTable {
  private?: Page[];
  public?: Page[];
  follwing?: Page[];
  org?: Page[];
  followingOrg?: Page[];
}

const LIST_NAME_TABLE = ["delete", "private", "follwing", "org", "following / org", "public"];

function setPageListTable(acc: PageListTable, cur: Page) {
  if(acc.hasOwnProperty(LIST_NAME_TABLE[cur.disclosureScope])) {
    acc[LIST_NAME_TABLE[cur.disclosureScope]].push(cur);
  } else {
    acc[LIST_NAME_TABLE[cur.disclosureScope]] = [cur];
  }

  return acc;
}

function useSidebar() {

  const {
    authState
  } = useAuth();

  const { 
    pageState,
    onCreatePage,
    onUpdatePage,
    onClearPageState,
    onDeletePage
  } = usePage();

  const pageListTable: PageListTable | null = useMemo(() => {
    return pageState.pageList && pageState.pageEditor? 
      pageState.pageList.reduce(setPageListTable, {}) 
      : null
  }, [pageState.pageList, pageState.pageEditor]);

  const handleClick = () => {
    onCreatePage("page", 5);
  }

  const socket = useSocket(SOCKET_URL);

  useEffect(() => {
    if(socket && pageState.updatedVersion) {
      socket.emit("updated", pageState.updatedVersion);
      onClearPageState("updatedVersion");
    }
  }, [socket, pageState.updatedVersion]);

  return {
    authState,
    pageState,
    pageListTable,
    onUpdatePage,
    onDeletePage,
    handleClick
  }
}

export type UseSidebarTypes = ReturnType<typeof useSidebar>;

export default useSidebar;