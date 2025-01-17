import { Route, Routes, useLocation } from "react-router";
import "./App.css";
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

function App() {
  const {user, loading} = useSelector((state:RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() =>{
    if(localStorage.getItem('accessToken') && !user){
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  if(loading){
    return <p> Загрузка...</p>
  }
  
  return <>
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path="/" element={<HomePage />} />

      <Route element={<UnAuthLayout/>}>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/registration' element={<RegistrationPage/>} />
      </Route>
      <Route element={<AuthLayout/>}>
        <Route path='/users' element={<UsersPage/>} />
      </Route>


    </Routes>
  </>;
}

export default App;
