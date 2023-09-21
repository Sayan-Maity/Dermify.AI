import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element: Component, ...rest }) => {
  return Cookies.get("token")? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;