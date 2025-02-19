import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import UnAuthLayout from "./pages/UnAuthLayout";
import AuthLayout from "./pages/AuthLayout";
import UsersPage from "./pages/UsersPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { checkAuth } from "./store/actions";
import { RootState } from "./store/store";
import TodoPage from "./pages/TodoPage/TodoPage";
import { authChecked } from "./store/authSlices";
import Layout from "./containers/Layout/Layout";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        dispatch(checkAuth());
      } else {
        dispatch(authChecked());
      }
    }
  }, [dispatch, user]);

  if (loading) {
    return <p> Загрузка...</p>;
  }

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Route>
        </Route>
        <Route element={<UnAuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
