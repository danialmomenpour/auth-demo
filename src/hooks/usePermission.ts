import {useAuth} from "../context/authContext.tsx";
import {hasPermission, Permission} from "../components/auth/permissions.ts";


export const usePermission = () => {
    const { user } = useAuth();

    const can = (permission: Permission) => {
        return hasPermission(user?.role, permission);
    };

    return { can };
};