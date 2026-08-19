import React from 'react';
import {Outlet} from "react-router";

const Layout = () => {
    return (
        <div className={"w-full min-h-[100dvh] flex flex-col items-center justify-center bg-neutral-200"}>
            <Outlet />
        </div>
    );
};


export default Layout;