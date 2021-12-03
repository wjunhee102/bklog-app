import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import usePage from "../../../hooks/usePage";
import { GetPageListReqType } from "../../../store/modules/page/utils";

function useBkSwitch(type: GetPageListReqType, userInfo: string) {
  const {
    pageState: {
      pageList
    },
    onGetPageList
  } = usePage();

  const history = useHistory();

  useEffect(() => {
    onGetPageList(type, userInfo);
  }, [type, userInfo]);

  useEffect(() => {
    // if(pageList[0]) {
    //   history.push(`/bklog/${type}/${userInfo}/${pageList[0].id}`)
    // }
  }, [pageList]);
}

export default useBkSwitch;