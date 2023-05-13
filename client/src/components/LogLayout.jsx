import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
function LogLayout() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.pathname);

    useEffect(() => {
        if (user && user._id && location.pathname === '/login') {
            console.log(user);
            navigate('/user/' + user._id);
        }
    }, [user]);

    return (
        <div className=" h-screen w-screen">
            <Outlet />
        </div>
    );
}

export default LogLayout;
