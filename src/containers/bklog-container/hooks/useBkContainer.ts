import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UseBkPageTypes } from "../../../pages/bkpage/hooks/useBkPage";
import { PageInfoProps } from "../../../store/modules/bklog/utils";

function useBkContainer({
    useBklogHooks,
    usePageHooks,
    useAuthHooks
}: UseBkPageTypes) {

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

  const pageInfo: PageInfoProps = useMemo(() => bklogState.pageInfo, [bklogState.pageInfo]);

  useEffect(() => {
    onResetBklog();
    onGetPage(pageId);
    if(pageEditor) onGetPageList("id", pageEditor.id, user? {id: user.id} : undefined);
  }, [pageId]);

  return {
    pageInfo,
    isLoading: bklogState.isLoading
  }
}

export default useBkContainer;