import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" replace></Navigate>;
  }
  return props.children;
};

export default PrivateRoute;
