import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetPageListReqType } from "../../../store/modules/page/utils";
import { BkPageHooksTypes } from "./useBkPage";

function useBkSwitch(type: GetPageListReqType, userInfo: string, {
  usePageHooks,
  useAuthHooks
}: BkPageHooksTypes) {
  const {
    pageState: {
      pageList
    },
    onGetPageList,
    onChangeToggle
  } = usePageHooks;

  const {
    authState: {
      user
    }
  } = useAuthHooks;

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