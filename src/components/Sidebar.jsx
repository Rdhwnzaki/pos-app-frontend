import { FaUser } from "react-icons/fa";
import { RiDashboard3Fill } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen }) {
    const navigate = useNavigate();
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-white text-black border-r-2 w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:static md:translate-x-0`}>
            <ul className='space-y-4 p-4 cursor-pointer'>
                <li>
                    <a
                        className='flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white transition-colors'
                        onClick={() => {
                            navigate("/dashboard");
                        }}>
                        <RiDashboard3Fill className='mr-3 text-2xl' />
                        <span className='font-medium'>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a
                        className='flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white transition-colors'
                        onClick={() => {
                            navigate("/users");
                        }}>
                        <FaUser className='mr-3 text-xl' />
                        <span className='font-medium'>Users</span>
                    </a>
                </li>
                <li>
                    <a
                        className='flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white transition-colors'
                        onClick={() => { }}>
                        <IoLogOutSharp className='mr-3 text-2xl' />
                        <span className='font-medium'>Logout</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
