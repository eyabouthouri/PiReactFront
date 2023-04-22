import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.session);
  if (!isLoggedIn || (props.isAdmin && !isAdmin)) {
    return <Navigate to="/" replace></Navigate>;
  }
  return props.children;
};

export default PrivateRoute;
