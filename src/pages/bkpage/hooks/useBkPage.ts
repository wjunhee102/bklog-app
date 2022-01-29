import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useBklog from "../../../hooks/useBklog";
import usePage from "../../../hooks/usePage";;

interface PageTitleMenuListStateType {
  type: "pageTitleMenu";
  payload: {
    clientY: number;
    innerHeight: number;
    pageId: string;
  }
} 

type ToggleMenuStateTypes = PageTitleMenuListStateType;

function useBkPage() {
  const toggleMenuState = useState<ToggleMenuStateTypes | null>(null);

  const useAuthHooks  = useAuth();
  const useBklogHooks = useBklog();
  const usePageHooks  = usePage();

  const navigate = useNavigate();

  return {
    toggleMenuState,
    useAuthHooks,
    useBklogHooks,
    usePageHooks,
    navigate
  }
}

export type UseBkPageTypes = ReturnType<typeof useBkPage>;

export default useBkPage;
