import { Login, Creation, Stats, User } from './pages';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
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
        path: 'admin/',
        element: (
            <RequireAuth>
                <RequireAdmin>
                    <MainLayout />,
                </RequireAdmin>
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: <User />,
            },
            {
                path: 'admin/Stats',
                element: <Stats />,
            },
            {
                path: 'admin/Creation',
                element: <Creation />,
            },
            // {
            //   path: "*",
            //   element: <Redirect />,
            // },
        ],
    },
    {
        path: 'user/:id?',
        element: (
            <RequireAuth>
                <User />
            </RequireAuth>
        ),
    },
    {
        path: '/event/:eventId',
        element: (
            <RequireAdmin>
                <Event />
            </RequireAdmin>
        ),
    },
]);

// const Redirect = () => {
//   const navigate = useNavigate();
//   useEffect(() => navigate("/login"), []);
//   return <></>;
// };
