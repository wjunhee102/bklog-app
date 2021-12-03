import { useCallback, useState } from "react";
import { GetPageListReqType } from "../store/modules/page/utils";
import useAuth from "./useAuth";
import usePage from "./usePage";



function useSetPage(type: GetPageListReqType, userInfo: string) {
  const [ pageEditToggle,  setPageEditToggle ] = useState();

  const {
    authState: {
      user
    }
  } = useAuth();

  const {
    onCreatePage
  } = usePage();

  const handleCreatePage = useCallback(() => {
    if(user) {
      if(type === "penname") {
        if(user.penName === userInfo) onCreatePage(user.id, "무제", 5);
      } else {
        if(user.id === userInfo) onCreatePage(user.id, "무제", 5);
      }
    }
  }, [user, type, userInfo]);

  return {
    handleCreatePage
  }
}

export default useSetPage;