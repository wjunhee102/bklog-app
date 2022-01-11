import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";

function useAuthPage() {
  const useAuthHooks = useAuth();
  const usePageHooks = usePage();

  const navigate = useNavigate();

  return {
    useAuthHooks,
    usePageHooks,
    navigate
  }
}

export type UseAuthPageTypes = ReturnType<typeof useAuthPage>;

export default useAuthPage;