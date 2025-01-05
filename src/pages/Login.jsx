import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === "succeeded") {
            navigate("/dashboard");
        }
        if (error) {
            toast.error(error);
        }
    }, [error, status, navigate]);

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    return (
        <div
            className='bg-cover bg-center h-screen flex justify-center items-center'
            style={{ backgroundImage: "url('/bg.jpg')" }}>
            <Toaster position='top-right' reverseOrder={false} />
            <Card className='w-[450px] bg-white shadow-lg rounded-lg'>
                <CardHeader>
                    <div className='flex justify-center content-center mb-16 items-center'>
                        <img src='logo.png' className='w-20 h-20' alt='SwiftPOS Logo' />
                        <p className='text-3xl font-bold text-midnight-blue'>SwiftPOS</p>
                    </div>
                    <CardDescription className='text-2xl text-midnight-blue text-center font-medium'>
                        Login Form
                    </CardDescription>
                    <CardDescription className='text-center font-normal text-champagne-gold'>
                        Log in to manage your restaurant efficiently
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='username' className='text-midnight-blue text-sm'>
                                Username
                            </label>
                            <input
                                id='username'
                                type='text'
                                placeholder='Enter your username'
                                className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.userName
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-slate-300 focus:ring-midnight-blue"
                                    }`}
                                {...register("userName")}
                            />
                            {errors.userName && (
                                <p className='text-red-500 text-sm'>
                                    {errors.userName.message}
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2 relative'>
                            <label htmlFor='password' className='text-midnight-blue text-sm'>
                                Password
                            </label>
                            <input
                                id='password'
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter your password'
                                className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-slate-300 focus:ring-midnight-blue"
                                    }`}
                                {...register("password")}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-[37px] text-slate-600 focus:outline-none mt-1'
                                onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                            {errors.password && (
                                <p className='text-red-500 text-sm'>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <p className='text-midnight-blue text-right cursor-pointer hover:underline text-sm'>
                            Forgot password?
                        </p>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center gap-4'>
                    <Button
                        type='submit'
                        className='bg-midnight-blue w-64 rounded-full hover:bg-midnight-blue'
                        onClick={handleSubmit(onSubmit)}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
