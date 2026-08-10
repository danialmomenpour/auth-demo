import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {cn} from "../../lib/utils";
import axios from "axios";

const loginSchema = z.object({
    username: z.string().min(4, "Username must contain at least 4 characters"),
    password: z.string().min(4, "Password must contain at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });


    const onSubmit = async (data: LoginFormData) => {

        const loginResponse = await axios.post('https://dummyjson.com/auth/login', {
            username: data?.username,
            password: data?.password,
            credentials: 'include'
        })

        console.log(loginResponse?.data);
    };

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
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex w-full max-w-sm flex-col gap-4"
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
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        disabled={isSubmitting}
                        className={inputStyles("password")}
                    />
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