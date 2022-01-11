import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useBklog from "../../../hooks/useBklog";
import usePage from "../../../hooks/usePage";;

function useBkPage() {
  const useAuthHooks  = useAuth();
  const useBklogHooks = useBklog();
  const usePageHooks  = usePage();

  const navigate = useNavigate();

  return {
    useAuthHooks,
    useBklogHooks,
    usePageHooks,
    navigate
  }
}

export type UseBkPageTypes = ReturnType<typeof useBkPage>;

export default useBkPage;
