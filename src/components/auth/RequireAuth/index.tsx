import {useAuth} from "../../../context/authContext.tsx";
import {Navigate, Outlet, useLocation} from "react-router";

type Role = 'admin' | 'moderator' | 'user';

type AllowedRoles = {
    allowedRoles: Role[];
}

const RequireAuth = ({allowedRoles}: AllowedRoles) => {

    const {user} = useAuth();
    const location = useLocation();

    console.log({user, allowedRoles});

    return (
        allowedRoles?.includes(user?.role)
            ? <Outlet/>
            : user
                ?
                <Navigate
                    to="/unauthorized"
                    replace={true}
                    state={{from: location}}
                />
                : <Navigate
                    to="/login"
                    replace={true}
                    state={{from: location}}
                />
    );
};


export default RequireAuth;