import { useCallback, useMemo } from 'react';
import { changePageTitle, changeToggle, createPage, getPageList, GetPageListQuery, GetPageListReqType, getUserProfile } from '../store/modules/page/utils';
import { PageState } from '../store/modules/page/utils';
import { RootState } from '../store/modules';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfile } from '../store/modules/auth/utils';

export const useConnectPageStore = (): PageState => useSelector((state: RootState) => state.page);

function usePageActions(state: PageState) {
  const pageEditor: UserProfile = useMemo(() => state.pageEditor, [state]);

  const pageToggle: boolean = useMemo(() => state.toggle, [state]);

  const dispatch = useDispatch();

  const onChangeToggle = useCallback((toggle?: boolean)=> {
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

  const onCreatePage = useCallback((profileId: string, title: string, disclosureScope: number = 5) => {
    dispatch(createPage(profileId, title, disclosureScope));
  }, [dispatch]);

  return {
    pageState: state,
    pageEditor,
    pageToggle,
    onChangeToggle,
    onChangePageTitle,
    onGetUserProfile,
    onGetPageList,
    onCreatePage
  }
}

export default () => usePageActions(useConnectPageStore());