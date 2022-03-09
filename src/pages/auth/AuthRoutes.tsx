import { Route, Routes } from "react-router-dom"
import SignIn from "../../components/auth/sign-in"
import SignUp from "../../components/auth/sign-up"
import NotFoundPage from "../notfound/NotFoundPage"
import { UseAuthPageTypes } from "./hooks/useAuthPage"

interface AuthRoutesProps {
  authPageHooks: UseAuthPageTypes;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({
  authPageHooks
}) => {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp authPageHooks={authPageHooks} />} />
      <Route path="sign-in" element={<SignIn authPageHooks={authPageHooks} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthRoutes;