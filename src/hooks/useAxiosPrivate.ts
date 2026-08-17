import {useAuth} from "../context/authContext.tsx";
import {axiosPrivate} from "../api/axios.ts";
import {useRefreshToken} from "./useRefreshToken.ts";
import {useEffect} from "react";

export const useAxiosPrivate = () => {

    const {accessToken} = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (request) => {
                if (!request.headers['Authorization']) {
                    request.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return request;
            },
            (error) => {
                return Promise.reject(error);
            }
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            },
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, [accessToken, refresh]);

    return axiosPrivate;
}
