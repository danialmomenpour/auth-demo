import {useCallback} from "react";
import {useAuth} from "../context/authContext.tsx";
import axios from "../api/axios.ts";

type RefreshResponse = {
    accessToken: string;
};

export const useRefreshToken = () => {
    const {setAccessToken} = useAuth();

    const refresh = useCallback(async (): Promise<string> => {
        const response = await axios.post<RefreshResponse>(
            "/auth/refresh",
            {
                expiresInMins: 7 * 24 * 60,
            },
            {
                withCredentials: true,
            }
        );

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        return newAccessToken;
    }, [setAccessToken]);

    return refresh;
};