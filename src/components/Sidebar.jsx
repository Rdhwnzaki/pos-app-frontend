export default function Sidebar({ isOpen }) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:static md:translate-x-0`}>
            <ul className='space-y-4 p-4'>
                <li>
                    <a href='#dashboard'>Dashboard</a>
                </li>
                <li>
                    <a href='#settings'>Settings</a>
                </li>
            </ul>
        </aside>
    );
}
