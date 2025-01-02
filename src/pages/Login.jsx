import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
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
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
    };

    return (
        <div
            className='bg-cover bg-center h-screen flex justify-center items-center'
            style={{ backgroundImage: "url('/bg.jpg')" }}>
            <Card className='w-[450px] bg-white shadow-lg rounded-lg'>
                <CardHeader>
                    <CardTitle className='text-center text-3xl mb-16 font-bold text-midnight-blue'>
                        SwiftPOS
                    </CardTitle>
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
                                className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.username
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-slate-300 focus:ring-[#ff5c00]"
                                    }`}
                                {...register("username")}
                            />
                            {errors.username && (
                                <p className='text-red-500 text-sm'>
                                    {errors.username.message}
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
                                        : "border-slate-300 focus:ring-[#ff5c00]"
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
                    <p
                        className='text-midnight-blue text-sm cursor-pointer hover:underline'
                        onClick={() => navigate("/register")}>
                        {"Don't have an account? Register"}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
