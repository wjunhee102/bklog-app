import { useEffect, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";
import useSocket from "../../../hooks/useSocket";
import { Page } from "../../../store/modules/page/utils";
import { SOCKET_URL } from "../../../utils/api-utils";

interface PageListTable {
  private?: Page[];
  public?: Page[];
  follwing?: Page[];
  org?: Page[];
  followingOrg?: Page[];
}

const LIST_NAME_TABLE = ["delete", "private", "follwing", "org", "followingOrg", "public"];

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
    onClearPageState
  } = usePage();

  const pageListTable: PageListTable | null = useMemo(() => {
    return pageState.pageList? 
      pageState.pageList.reduce(setPageListTable, {}) 
      : null
  }, [pageState.pageList]);

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

  const handleClick2 = () => {
    onUpdatePage({
      pageId: "483b36a4ed5e18c181070ddf16708b42",
      data: {
        title: "hello world1234"
      }
    });
  }

  return {
    authState,
    pageState,
    pageListTable,
    handleClick,
    handleClick2
  }
}

export type UseSidebarTypes = ReturnType<typeof useSidebar>;

export default useSidebar;