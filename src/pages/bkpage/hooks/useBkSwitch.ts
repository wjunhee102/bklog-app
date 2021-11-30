import { useEffect } from "react";
import usePage from "../../../hooks/usePage";
import { GetPageListReqType } from "../../../store/modules/page/utils";

function useBkSwitch(type: GetPageListReqType, userInfo: string) {
  const {
    onGetPageList
  } = usePage();

  useEffect(() => {
    onGetPageList(type, userInfo);
  }, [type, userInfo]);
}

export default useBkSwitch;