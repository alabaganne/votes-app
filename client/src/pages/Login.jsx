import { InputField } from '../components';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    //const [users, setUsers] = useState([]);
    const [CIN, setCIN] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        setIsLoading(true);

        const user = {
            CIN,
            password,
        };

        api.users
            .post('/login', user)
            .then(function (res) {
                const { token, user } = res.data;

                login({
                    token,
                    user,
                });

                navigate('/user/' + user._id);
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status === 401) {
                    alert('Wrong CIN or password');
                }
                setIsLoading(false);
                return;
            });
    };

    return (
        <section className="flex justify-center items-center w-screen h-screen">
            <form
                className="border w-full max-w-lg px-8 py-16 rounded-md"
                onSubmit={handleLogin}
            >
                <div className="text-center">
                    <h4 className="text-green-600 font-bold text-2xl">
                        Vote for your FUTURE
                    </h4>
                    <p className="text-gray-400 text-base mt-1">
                        Your voice matters
                    </p>
                </div>
                <div className="mt-8 gap-8 flex flex-col w-full">
                    <label className="w-full flex flex-col gap-2">
                        <label className="text-xs text-green-600">CIN</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={CIN}
                            onChange={(e) => setCIN(e.target.value)}
                            placeholder="12345678"
                        />
                    </label>
                    <label className="w-full flex flex-col gap-2">
                        <label className="text-xs text-green-600">
                            Password
                        </label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </label>
                    {!isLoading && (
                        <input
                            className="btn-primary w-full !py-3"
                            type="submit"
                            value="Login -&gt;"
                        />
                    )}
                    {isLoading && (
                        <input
                            disabled
                            className="btn-primary w-full !py-3"
                            type="submit"
                            value="Logging in ..."
                        />
                    )}
                </div>
            </form>
        </section>
    );
};

export default Login;
