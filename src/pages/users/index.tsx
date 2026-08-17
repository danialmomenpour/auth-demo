import React, {useEffect} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate.ts";
import {useLocation, useNavigate} from "react-router";

const UsersPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const users = async () => {

            try {
                const res = await axiosPrivate.get("/user/me");
                console.log(res);
            } catch (err) {
                console.log(err);
                navigate('/login' , {state: {from: location} , replace: true});
            }
        }
        users();
    }, [])

    return (
        <div className={'w-full max-w-xl bg-white p-8 rounded-lg'}>
            UsersPage
        </div>
    );
};


export default UsersPage;