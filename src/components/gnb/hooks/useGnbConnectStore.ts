import useAuth from "../../../hooks/useAuth";
import useBase from "../../../hooks/useBase";
import useStoreReset from "../../../hooks/useStoreReset";

function useGnbConnectStore() {

  const {
    baseState: {
      browser
    }
  } = useBase();

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
    onAllReset,
    browser
  }
}

export type UseGnbConnectStoreType = ReturnType<typeof useGnbConnectStore>;

export default useGnbConnectStore;