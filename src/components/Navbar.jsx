import { useState } from "react";

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <nav className='bg-blue-600 text-white p-4 flex justify-between items-center'>
            <button
                className='md:hidden text-white'
                onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
            </button>
            <div className='text-xl font-bold'>My App</div>
        </nav>
    );
}
