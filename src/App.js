import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import Partner from "./pages/partner/Partner";
import Function from "./pages/function/Function";
import Apps from "./pages/app/Apps";
import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SideBar from "./components/sidebar/SideBar";
import * as LoginService from "./services/LoginService";
import Home from "./pages/home/Home";
import Role from "./pages/role/Role";
import Forbiden from "./pages/forbiden/Forbidden";

//import Actions
import { getAuth as getAuths } from "./redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./pages/loadingPage";

function App() {
  const dispatch = useDispatch();
  const { loading, isAuth } = useSelector((state) => state.getAuth);
  const [theme, colorMode] = useMode();
  const isLoggedIn = LoginService.isLoggedIn() !== null;
  const url = window.location.href.split("/").slice(3, 4).toString();
  useEffect(() => {
    dispatch(getAuths());
  }, [dispatch]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter forceRefresh={true}>
          {loading ? <LoadingPage /> :
            <>
              <div className="app">
                {isAuth && isAuth.length && isAuth.includes(url) && isLoggedIn && <SideBar />}
                <main id="content" className="content">
                  <Routes>
                    {isLoggedIn ?
                      <>
                        {isAuth && isAuth.length && !isAuth.includes(url) ?
                          <>
                            <Route exact path="/forbidden" element={<Forbiden />} />
                            <Route path={`/${url}`} element={<Navigate to="/forbidden" />} />
                          </> :
                          <>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/function" element={<Function />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/partner" element={<Partner />} />
                            <Route path="/role" element={<Role />} />
                            <Route path="/app" element={<Apps />} />
                            <Route path="/login" element={<Navigate to="/" />} />
                          </>}
                      </> :
                      <>
                        <Route exact path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                      </>}
                  </Routes>
                </main>
              </div>
            </>}
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
