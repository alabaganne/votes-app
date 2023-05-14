import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
