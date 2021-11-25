import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";

function useGnbConnectStore() {
  const {
    pageToggle,
    onChangeToggle
  } = usePage();

  const {
    authState: { loading, user },
    onSignOutUser
  } = useAuth();

  return {
    pageToggle,
    onChangeToggle,
    loading,
    user,
    onSignOutUser
  }
}

export type UseGnbConnectStoreType = ReturnType<typeof useGnbConnectStore>;

export default useGnbConnectStore;