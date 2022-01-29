import { useCallback, useMemo } from 'react';
import { changePageTitle, changeToggle, clearPageState, ClearPageStateType, createPage, deletePage, getPageList, GetPageListQuery, GetPageListReqType, getUserProfile, ReqUpdatePageInfo, updatePageInfo } from '../store/modules/page/utils';
import { PageState } from '../store/modules/page/utils';
import { RootState } from '../store/modules';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfile } from '../store/modules/auth/utils';

export const useConnectPageStore = (): PageState => useSelector((state: RootState) => state.page);

function usePageActions(state: PageState) {

  const pageToggle: boolean = useMemo(() => state.toggle, [state]);

  const dispatch = useDispatch();

  const onResetPage = useCallback(() => {
    dispatch(onResetPage());
  }, [dispatch]);

  const onChangeToggle = useCallback((toggle?: boolean) => {
    dispatch(changeToggle(toggle))
  },[dispatch]);

  const onChangePageTitle = useCallback((pageId: string, title: string) => {
    dispatch(changePageTitle(pageId, title))
  }, [dispatch]);

  const onGetUserProfile = useCallback((type: GetPageListReqType, userInfo: string) => {
    dispatch(getUserProfile(type, userInfo));
  }, [dispatch]);

  const onGetPageList = useCallback((type: GetPageListReqType, userInfo: string, query?: GetPageListQuery) => {
    dispatch(getPageList(type, userInfo, query));
  }, [dispatch]);

  const onCreatePage = useCallback((title: string, disclosureScope: number = 5) => {
    dispatch(createPage(title, disclosureScope));
  }, [dispatch]);

  const onDeletePage = useCallback((pageId: string) => {
    dispatch(deletePage({ pageId }));
  }, [dispatch]);

  const onUpdatePage = useCallback((data: ReqUpdatePageInfo) => {
    dispatch(updatePageInfo(data));
  }, [dispatch]);

  const onClearPageState = useCallback((...key: ClearPageStateType[]) => {
    dispatch(clearPageState(...key));
  }, [dispatch]);

  return {
    pageState: state,
    pageToggle,
    onResetPage,
    onChangeToggle,
    onChangePageTitle,
    onGetUserProfile,
    onGetPageList,
    onCreatePage,
    onDeletePage,
    onUpdatePage,
    onClearPageState
  }
}

export default () => usePageActions(useConnectPageStore());