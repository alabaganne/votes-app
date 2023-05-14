import { Login, Creation, Stats, Events } from './pages';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import { MainLayout, LogLayout } from './components';
import { useEffect } from 'react';
import { RequireAdmin, RequireAuth } from './context/AuthContext';
import Event from './pages/Event';

// export const Unauthenticated = createBrowserRouter([]);

export const Authenticated = createBrowserRouter([
    {
        path: '/',
        element: <LogLayout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/Login',
                element: <Login />,
            },
        ],
    },
    {
        path: '/events',
        element: (
            <RequireAuth>
                <MainLayout>
                    <Outlet />
                </MainLayout>
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: (
                    <RequireAuth>
                        <Events />
                    </RequireAuth>
                ),
            },
            {
                path: ':eventId',
                element: (
                    <RequireAdmin>
                        <Event />
                    </RequireAdmin>
                ),
            },
            {
                path: 'create',
                element: (
                    <RequireAdmin>
                        <Creation />
                    </RequireAdmin>
                ),
            },
        ],
    },
]);

// const Redirect = () => {
//   const navigate = useNavigate();
//   useEffect(() => navigate("/login"), []);
//   return <></>;
// };
