import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import Partner from "./pages/partner/Partner";
import Function from "./pages/function/Function";
import Apps from "./pages/app/Apps";
import React, {useState} from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import SideBar from "./components/sidebar/SideBar";
import * as LoginService from "./services/LoginService";
import Home from "./pages/home/Home";
import Test from "./components/form/Test";
import Role from "./pages/role/Role";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const isLoggedIn = LoginService.isLoggedIn() !== null;
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter forceRefresh={true}>
                    <div className="app">
                        {isLoggedIn && <SideBar isSidebar={isSidebar}/>}
                        <main id="content" className="content">
                            <Routes>
                                <Route exact path='/' element={isLoggedIn ? <Home/> : <Navigate to='/login'/>}/>
                                <Route path='/function' element={isLoggedIn ? <Function/> : <Navigate to='/login'/>}/>
                                <Route path='/user' element={isLoggedIn ? <User/> : <Navigate to='/login'/>}/>
                                <Route path='/partner' element={isLoggedIn ? <Partner/> : <Navigate to='/login'/>}/>
                                <Route path='/role' element={isLoggedIn ? <Role/> : <Navigate to='/login'/>}/>
                                <Route path='/app' element={isLoggedIn ? <Apps/> : <Navigate to='/login'/>}/>
                                <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to='/'/>}/>
                                <Route path='/test' element={isLoggedIn ? <Test/> : <Navigate to='/login'/>}/>
                                {/*<Route path='/chooseCar' element={<ChooseCar/>}/>*/}
                                {/*<Route path='/contract' element={<Contract/>}/>*/}
                                {/*<Route path='/car' element={<Car/>}/>*/}
                            </Routes>
                        </main>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
