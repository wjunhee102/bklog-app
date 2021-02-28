import { useCallback } from 'react';
import { changePageTitle } from '../store/modules/page';
import { PageState } from '../store/modules/page/utils';
import { RootState } from '../store/modules';
import { useSelector, useDispatch } from 'react-redux';

function usePage() {
  const pageState: PageState = useSelector((state: RootState) => state.page);

  const dispatch = useDispatch();

  const onChangePageTitle = useCallback((pageId: string, title: string) => 
    dispatch(changePageTitle(pageId, title)), [dispatch]);

  return {
    pageState,
    onChangePageTitle
  }
}