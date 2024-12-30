import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log("Login Data:", data);
    };

    return (
        <div
            className="bg-cover bg-center h-screen flex justify-center items-center"
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            <Card className="w-[450px] bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-3xl mb-12">SwiftPOS</CardTitle>
                    <CardDescription className="text-2xl text-black text-center">Login</CardDescription>
                    <CardDescription className="text-center">Please login</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-slate-600">Username</label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-[#ff5c00]"
                                    }`}
                                {...register("username")}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-slate-600">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-[#ff5c00]"
                                    }`}
                                {...register("password")}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <p className="text-[#ff5c00] text-right cursor-pointer hover:underline">Forgot password?</p>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                    <Button
                        type="submit"
                        className="bg-[#ff5c00] w-64 rounded-full"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                    <span className="text-slate-400 text-sm">End User Agreement</span>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginForm;
