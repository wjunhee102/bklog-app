import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectAuthStore } from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";
import { GetPageListReqType } from "../../../store/modules/page/utils";

function useBkSwitch(type: GetPageListReqType, userInfo: string) {
  const {
    pageState: {
      pageList
    },
    onGetPageList,
    onChangeToggle
  } = usePage();

  const {
    user
  } = useConnectAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    onGetPageList(type, userInfo, user? {
      id: user.id
    } : undefined);
  }, [type, userInfo, user]);

  useEffect(() => {
    // if(pageList[0]) {
    //   navigate(`/bklog/${type}/${userInfo}/${pageList[0].id}`)
    // }
  }, [pageList]);

  useEffect(() => {
    onChangeToggle(true);
  }, []);
}

export default useBkSwitch;