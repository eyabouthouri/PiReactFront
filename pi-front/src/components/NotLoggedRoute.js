import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NotLoggedRoute = (props) => {
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/home" replace></Navigate>;
  }
  return props.children;
};

export default NotLoggedRoute;
