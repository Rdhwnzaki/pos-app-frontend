import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex flex-1'>
                <Sidebar />
                <main className='flex-1 p-6'>{children}</main>
            </div>
        </div>
    );
}
