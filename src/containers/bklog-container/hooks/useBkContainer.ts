import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PageInfoProps } from "../../../components/block/entities/modify/type";
import { UseBkPageTypes } from "../../../pages/bkpage/hooks/useBkPage";


function useBkContainer({
    useBklogHooks,
    usePageHooks,
    useAuthHooks,
    navigate
}: UseBkPageTypes) {

  const [ penName, setPenName ] = useState<string | null>(null);

  const { 
    bklogState,
    onGetPage,
    onResetBklog
  } = useBklogHooks;

  const {
  pageState: {
    pageEditor
  },
  onGetPageList
  } = usePageHooks;

  const {
    authState: {
      user
    }
  } = useAuthHooks;

  const { pageId } = useParams();

  const pageInfo: PageInfoProps | null = useMemo(() => bklogState.pageInfo, [bklogState.pageInfo]);

  useEffect(() => {
    onResetBklog();
    if(pageId) onGetPage(pageId);
    if(pageEditor && pageEditor.id) onGetPageList("id", pageEditor.id, user && user.id? {id: user.id} : undefined);
  }, [pageId]);



  useEffect(() => {
    if(pageEditor && pageEditor.penName !== penName) {
      if(penName) navigate(`/bklog/penname/${pageEditor.penName}`);
      setPenName(pageEditor.penName);
    }
  }, [penName, pageEditor]);

  return {
    pageInfo,
    isLoading: bklogState.isLoading
  }
}

export default useBkContainer;