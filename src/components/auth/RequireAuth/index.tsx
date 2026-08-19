import {useAuth, type UserRole} from "../../../context/authContext.tsx";
import {Navigate, Outlet, useLocation} from "react-router";

type AllowedRoles = {
    allowedRoles: UserRole[];
};

const RequireAuth = ({allowedRoles}: AllowedRoles) => {
    const {user} = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{from: location}}
            />
        );
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate
                to="/unauthorized"
                replace
                state={{from: location}}
            />
        );
    }

    return <Outlet />;
};

export default RequireAuth;