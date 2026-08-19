import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate.ts";
import {useLocation, useNavigate} from "react-router";
import {cn} from "../../lib/utils";
import {User} from "../../context/authContext.tsx";

const UsersPage = () => {

    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const users = async () => {

            try {
                const res = await axiosPrivate.get("/user/me");
                setUser(res.data);
            } catch (err) {
                console.log({err});
                navigate('/login', {state: {from: location}, replace: true});
            }
        }
        users();
    }, [])

    return (
        <div className={'w-full max-w-xl bg-white p-8 rounded-lg flex items-center justify-center flex-col'}>
            {user ?
                <div className={cn('flex items-start gap-4')}>
                    <div className={cn('p-1.5 bg-gray-300 rounded-full')}>
                        <img
                            src={user?.image}
                            alt={user?.username}
                            className={"w-20 h-20"}
                        />
                    </div>

                    <div className={cn('flex flex-col gap-1 font-medium text-md')}>
                        <span>first-name: {user?.firstName}</span>
                        <span>last-name: {user?.lastName}</span>
                        <span>age: {user?.age}</span>
                    </div>

                </div>
                :
                <p>loading...</p>
            }
        </div>
    );
};


export default UsersPage;