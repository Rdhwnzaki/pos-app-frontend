import { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <nav className='bg-white text-black p-4 flex justify-between items-center border-b-2 border-slate-200'>
            <button
                className='md:hidden text-white'
                onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
            </button>
            <div className='flex items-center'>
                <div className='flex-none'>
                    <img src='logo.png' className='w-24 h-24' alt='SwiftPOS Logo' />
                </div>
                <div className='flex-none flex-col'>
                    <p className='text-xl font-semibold'>Walk-In</p>
                    <p className='text-lg font-base'>SwiftPOS</p>
                </div>
                <div className='grow ml-96'>
                    <div className='flex space-x-32'>
                        <div className='flex flex-row items-center'>
                            <GoHomeFill className='text-2xl me-2 text-midnight-blue' />
                            <span className='font-medium text-midnight-blue text-lg'>
                                Home
                            </span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <FaClipboardList className='text-xl me-2 text-midnight-blue' />
                            <span className='font-medium text-midnight-blue text-lg'>
                                Order
                            </span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <FaHistory className='text-xl me-2 text-midnight-blue' />
                            <span className='font-medium text-midnight-blue text-lg'>
                                History
                            </span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <IoReceipt className='text-xl me-2 text-midnight-blue' />
                            <span className='font-medium text-midnight-blue text-lg'>
                                Bills
                            </span>
                        </div>
                        <div className='bg-slate-200 py-3 px-3 rounded-full font-mono text-lg'>
                            <span>{currentDate.toLocaleString()}</span>
                        </div>
                        <div>
                            <Avatar className='w-12 h-12'>
                                <AvatarImage src='bg.jpg' />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
