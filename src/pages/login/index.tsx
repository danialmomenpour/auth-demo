import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {cn} from "../../lib/utils";
import axios from "../../api/axios";
import {isAxiosError} from "axios";
import {useAuth} from "../../context/authContext.tsx";
import {useLocation, useNavigate} from "react-router";
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";

const LOGIN_URL = "/auth/login";
const GET_USER_URL = "/auth/me";

const loginSchema = z.object({
    username: z.string().min(4, "Username must contain at least 4 characters"),
    password: z.string().min(4, "Password must contain at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {

    const [visiblePassword, setVisiblePassword] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/home";

    const {login} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const loginResponse = await axios.post(LOGIN_URL,
                {
                    username: data?.username,
                    password: data?.password,
                    expiresInMins: 1, // defaults to 60
                },
            )
            const accessToken = loginResponse?.data?.accessToken;
            const refreshToken = loginResponse?.data?.refreshToken;

            const userInfoResponse = await axios.get(GET_USER_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            const userData = userInfoResponse.data;
            login(userData, accessToken , refreshToken);
            navigate(from, {replace: true});
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 400) {
                    alert("username or password doesn't exist!");
                } else if (status === 401) {
                    alert("unauthorized");
                } else {
                    alert("login failed!");
                }
            }
        }
    }

    const inputStyles = (field: keyof LoginFormData) =>
        cn(
            "w-full rounded-lg border px-4 py-2 text-sm outline-none transition-colors",
            errors[field]
                ? "border-red-500"
                : isValid
                    ? "border-green-500"
                    : "border-gray-300",
        );

    return (
        <div className="w-full max-w-xl bg-white p-8 rounded-lg">
            <h1 className={"font-bold text-center"}>Login Page</h1>
            <br/>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex w-full  flex-col gap-4"
            >
                <div className="flex flex-col gap-1">
                    <input
                        {...register("username")}
                        placeholder="Username"
                        disabled={isSubmitting}
                        className={inputStyles("username")}
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <div className={cn('flex relative')}>
                        <input
                            {...register("password")}
                            type={visiblePassword ? "text" : "password"}
                            placeholder="Password"
                            disabled={isSubmitting}
                            className={cn(inputStyles("password"))}
                        />

                        <button
                            className={"cursor-pointer absolute end-1 top-0 bottom-0"}
                            onClick={() => {
                                setVisiblePassword(prev => !prev);
                            }}
                        >
                            {!visiblePassword ? <Eye/> : <EyeOff/>}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Processing..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;