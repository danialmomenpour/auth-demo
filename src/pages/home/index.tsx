import React from 'react';
import {Link} from "react-router";

const HomePage = () => {

    return (
        <div className={'w-full max-w-xl flex flex-col gap-4 bg-white p-8 rounded-lg'}>
            <h1 className={'font-bold text-3xl'}>project routes</h1>

            <Link to={"/products"} className={"text-blue-500"}>
                products
            </Link>

            <Link to={"/users"} className={"text-blue-500"}>
                users
            </Link>
        </div>
    );
};


export default HomePage;