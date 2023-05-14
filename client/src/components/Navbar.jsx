import { Link, useNavigate } from 'react-router-dom';
import { Logo, Menu, Close, Logout } from '../assets';
import { useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    //const [active, setActive] = useState("Election");
    const [toggle, setToggle] = useState(false);
    const { role, isAuthenticated } = useAuth();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/Login');
    };

    if (!user) return null;

    return (
        <nav className="px-12 py-6 flex justify-between items-center border-b">
            <img src={Logo} alt="Logo" />
            {/* <div className="flex items-center gap-8">
                <Link
                    to="/events"
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    Events
                </Link>
            </div> */}
            <div className=" flex gap-10">
                <button onClick={onLogout} className="bg-transparent">
                    <img src={Logout} alt="Logout" />
                </button>
                <div className="">{user.username || 'Username'}</div>
            </div>
        </nav>
    );
};

export default Navbar;
