import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import Navbar from "./components/navbar/Navbar";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import Partner from "./pages/partner/Partner";

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <div className="main">
                {localStorage.getItem("user") ?
                    <SideBar/> : ""}
                <div className="app">
                    <Navbar/>
                    <div className="main-content">
                        <Routes>
                            <Route path='/login' element={<Login/>}/>
                            <Route exact path='/user' element={<User/>}/>
                            <Route path='/partner' element={<Partner/>}/>
                            {/*<Route path='/searchCar' element={<SearchCar/>}/>*/}
                            {/*<Route path='/searchuser' element={<Searchuser/>}/>*/}
                            {/*<Route path='/login' element={<Login/>}/>*/}
                            {/*<Route path='/chooseCar' element={<ChooseCar/>}/>*/}
                            {/*<Route path='/contract' element={<Contract/>}/>*/}
                            {/*<Route path='/car' element={<Car/>}/>*/}
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
