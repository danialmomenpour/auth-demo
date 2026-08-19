import {usePermission} from "../../../hooks/usePermission.ts";
import {Permission} from "../permissions.ts";
import {ReactNode} from "react";

type CanProps = {
    permission: Permission;
    children: ReactNode;
};

export const CanAccess = ({
                        permission,
                        children,
                    }: CanProps) => {
    const { can } = usePermission();

    if (!can(permission)) {
        return null;
    }

    return children;
};