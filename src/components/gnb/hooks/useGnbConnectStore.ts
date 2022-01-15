import useAuth from "../../../hooks/useAuth";
import useStoreReset from "../../../hooks/useStoreReset";

function useGnbConnectStore() {

  const {
    authState: { loading, user },
    onSignOutUser
  } = useAuth();

  const {
    onAllReset
  } = useStoreReset();

  return {
    loading,
    user,
    onSignOutUser,
    onAllReset
  }
}

export type UseGnbConnectStoreType = ReturnType<typeof useGnbConnectStore>;

export default useGnbConnectStore;