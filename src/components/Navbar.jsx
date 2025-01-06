import { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaClipboardList } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

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
        <nav className='bg-white text-black p-4 flex justify-between items-center border-b-2 border-slate-200 h-20'>
            <button
                className='md:hidden text-2xl text-midnight-blue'
                onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
            </button>
            <div className='flex items-center'>
                <div className='flex-none'>
                    <img src='logo.png' className='w-24 h-24' alt='SwiftPOS Logo' />
                </div>
                <div className='flex-none ml-4'>
                    <p className='text-xl font-semibold text-gray-800'>Walk-In</p>
                    <p className='text-lg font-medium text-gray-600'>SwiftPOS</p>
                </div>
            </div>
            <div className='flex-grow flex justify-center cursor-pointer'>
                <div className='flex space-x-8 items-center'>
                    <div className='flex flex-row items-center text-gray-800 hover:text-midnight-blue transition duration-200'>
                        <GoHomeFill className='text-2xl me-2' />
                        <span className='font-medium'>Home</span>
                    </div>
                    <div className='flex flex-row items-center text-gray-800 hover:text-midnight-blue transition duration-200'>
                        <FaClipboardList className='text-xl me-2' />
                        <span className='font-medium'>Order</span>
                    </div>
                    <div className='flex flex-row items-center text-gray-800 hover:text-midnight-blue transition duration-200'>
                        <FaHistory className='text-xl me-2' />
                        <span className='font-medium'>History</span>
                    </div>
                    <div className='flex flex-row items-center text-gray-800 hover:text-midnight-blue transition duration-200'>
                        <IoReceipt className='text-xl me-2' />
                        <span className='font-medium'>Bills</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='bg-slate-200 py-2 px-4 rounded-full text-sm font-mono'>
                    <span>
                        {moment(currentDate.toLocaleString()).format(
                            "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                    </span>
                </div>
                <div>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src='user.jpg' />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    );
}
