import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router";

const UnAuthLayout = () => {
  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);

  if (user && isAuthChecked) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnAuthLayout;
