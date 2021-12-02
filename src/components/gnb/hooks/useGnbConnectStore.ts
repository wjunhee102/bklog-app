import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";
import useStoreReset from "../../../hooks/useStoreReset";

function useGnbConnectStore() {
  const {
    pageToggle,
    onChangeToggle
  } = usePage();

  const {
    authState: { loading, user },
    onSignOutUser
  } = useAuth();

  const {
    onAllReset
  } = useStoreReset();

  return {
    pageToggle,
    onChangeToggle,
    loading,
    user,
    onSignOutUser,
    onAllReset
  }
}

export type UseGnbConnectStoreType = ReturnType<typeof useGnbConnectStore>;

export default useGnbConnectStore;