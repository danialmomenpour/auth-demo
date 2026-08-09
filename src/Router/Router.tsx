import HomePage from "../pages/home";
import {Route, Routes} from "react-router";
import MainPage from "../pages/main";
import LoginPage from "../pages/login";


export const Routers = () => {

    return (
        <Routes>
            <Route path={"/"} element={<MainPage />}/>
            <Route path={"/home"} element={<HomePage />}/>
            <Route path={"/login"} element={<LoginPage />}/>
        </Routes>
    );
};
