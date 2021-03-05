import { useCallback } from 'react';
import { changePageTitle, changeToggle } from '../store/modules/page';
import { PageState } from '../store/modules/page/utils';
import { RootState } from '../store/modules';
import { useSelector, useDispatch } from 'react-redux';
import { UserProfile } from '../store/modules/auth/utils';

function usePage() {
  const state: PageState = useSelector((state: RootState) => state.page);

  const pageEditor: UserProfile = state.pageEditor;

  const pageToggle: boolean = state.toggle;

  const dispatch = useDispatch();

  const onChangeToggle = useCallback((toggle?: boolean)=> 
    dispatch(changeToggle(toggle)),[dispatch]);

  const onChangePageTitle = useCallback((pageId: string, title: string) => 
    dispatch(changePageTitle(pageId, title)), [dispatch]);

  return {
    pageState: state,
    pageEditor,
    pageToggle,
    onChangeToggle,
    onChangePageTitle
  }
}

export default usePage;