import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(true);

    const login = ({ token, user }) => {
        if (token && role) {
            api.setApiTokens(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setIsAuthenticated(true);
            setUser(user);
            setRole(user.isAdmin ? 'admin' : 'user');
        }
    };
    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setRole('user');
    };

    const value = {
        isAuthenticated,
        user,
        role,
        login,
        logout,
        isLoading,
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            let u = localStorage.getItem('user');
            if (u) {
                api.setApiTokens(token);
                setIsAuthenticated(true);
                setUser(JSON.parse(u));
                setRole(u.isAdmin ? 'admin' : 'user');
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
const RequireAuth = ({ children }) => {
    const { isAuthenticated, role, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location', location);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }

        if (isAuthenticated) {
            console.log('isAuthenticated');
        }
    }, [isAuthenticated]);

    return children;
};

const RequireAdmin = ({ children }) => {
    const { isAuthenticated, role } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated && role !== 'admin') {
        navigate('/User');
    }

    return children;
};

export default AuthProvider;
export { useAuth, RequireAuth, RequireAdmin };
