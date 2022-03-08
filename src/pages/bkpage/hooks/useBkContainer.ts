import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetPageListReqType } from "../../../store/modules/page/utils";
import { UseBkPageTypes } from "./useBkPage";

function useBkSwitch(type: GetPageListReqType, {
  usePageHooks,
  useAuthHooks,
  navigate
}: UseBkPageTypes) {
  const { userInfo } = useParams();

  const {
    pageState: {
      error,
      pageList,
      tempPageInfo,
      pageEditor
    },
    onGetPageList,
    onChangeToggle,
    onClearPageState
  } = usePageHooks;

  const {
    authState: {
      user
    }
  } = useAuthHooks;

  useEffect(() => {
    if(userInfo) onGetPageList(type, userInfo, user && user.id? { id: user.id } : undefined);
  }, [type, userInfo, user]);
  
  useEffect(() => {
    if(error && error.code === "004") navigate("/not-found-page");
  }, [error]);

  useEffect(() => {
    onChangeToggle(true);
  }, []);

  useEffect(() => {

    if(user && user.id === pageEditor.id && tempPageInfo?.id) {
      navigate(`/bklog/id/${user.id}/${tempPageInfo.id}`);
      onClearPageState('tempPageInfo');
    }
    
  }, [tempPageInfo]);
}

export default useBkSwitch;