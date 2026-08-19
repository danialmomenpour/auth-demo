
type Role = 'admin' | 'moderator' | 'user';

export type Permission =
    | "products:read"
    | "products:update"
    | "products:delete";

const rolePermissions: Record<Role, Permission[]> = {
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
    role: Role | undefined,
    permission: Permission,
): boolean => {
    if (!role) {
        return false;
    }

    return rolePermissions[role].includes(permission);
};