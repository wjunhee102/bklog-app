import { Route, Routes } from "react-router-dom"
import SignIn from "../../components/auth/sign-in"
import SignUp from "../../components/auth/sign-up"
import NotFoundPage from "../NotFoundPage"

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthRoutes;