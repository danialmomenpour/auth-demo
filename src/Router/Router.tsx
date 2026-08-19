import HomePage from "../pages/home";
import {Route, Routes} from "react-router";
import LoginPage from "../pages/login";
import ProductsPage from "../pages/products";
import Layout from "../components/layout";
import RequireAuth from "../components/auth/RequireAuth";
import UsersPage from "../pages/users";
import UnauthorizedPage from "../pages/unauthorized";


export const Routers = () => {

    return (
        <Routes>
            <Route element={<Layout/>}>
                {/*public routes*/}
                <Route path={"/home"} element={<HomePage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/unauthorized"} element={<UnauthorizedPage/>}/>

                {/*protected routes*/}
                <Route element={<RequireAuth allowedRoles={["admin", "moderator", "user"]}/>}>
                    <Route path={"/products"} element={<ProductsPage/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={["admin"]}/>}>
                    <Route path={"/users"} element={<UsersPage/>}/>
                </Route>
            </Route>
        </Routes>
    );
};
