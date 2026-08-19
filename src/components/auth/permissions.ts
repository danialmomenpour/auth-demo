import {UserRole} from "../../context/authContext.tsx";

export type Permission =
    | "products:read"
    | "products:update"
    | "products:delete";

const rolePermissions: Record<UserRole, Permission[]> = {
    admin: [
        "products:read",
        "products:update",
        "products:delete",
    ],

    moderator: [
        "products:read",
        "products:update",
    ],

    user: [
        "products:read",
    ],
};

// auth/permissions.ts

export const hasPermission = (
    role: UserRole | undefined,
    permission: Permission,
): boolean => {
    if (!role) {
        return false;
    }

    return rolePermissions[role].includes(permission);
};