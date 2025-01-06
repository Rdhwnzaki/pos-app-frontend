import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar className='sticky top-0 z-10' />
            <div className='flex flex-1 overflow-hidden'>
                <Sidebar className='sticky top-0 h-screen overflow-y-auto' />
                <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
            </div>
        </div>
    );
}
