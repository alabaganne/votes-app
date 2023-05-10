import { InputField } from '../components';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';

const Login = () => {
    //const [users, setUsers] = useState([]);
    const [CIN, setCIN] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            CIN,
            password,
        };

        authApi.post('/login', user).then(function (res) {
            if (res.status === 401) {
                alert('Wrong CIN or password');
                return;
            }

            login({
                token: res.data.token,
                userId: res.data.userId,
                role: 'user',
            });
        });
    };

    return (
        <section className="flex justify-center items-center w-screen h-screen">
            <form
                className="w-[90%] ss:w-[60%] sm:w-[40%] md:w-[30%] p-10 sm:p-16 border-solid border-2 border-border rounded-md flex flex-col gap-8 justify-center items-center"
                onSubmit={handleLogin}
            >
                <h4 className="text-primary font-poppins font-medium text-lg">
                    Vote for your Future
                </h4>
                <label className="w-full flex flex-col gap-2">
                    <p className=" font-poppins text-sm text-primary tracking-wider">
                        CIN
                    </p>
                    <input
                        className="w-full p-2 rounded-sm border-border border-solid border-2 outline-0"
                        type="text"
                        name="email"
                        value={CIN}
                        onChange={(e) => setCIN(e.target.value)}
                    />
                </label>
                <label className="w-full flex flex-col gap-2">
                    <p className=" font-poppins text-sm text-primary tracking-wider">
                        Password
                    </p>
                    <input
                        className="w-full p-2 rounded-sm border-border border-solid border-2 outline-0"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!isPending && (
                    <input
                        className=" text-white bg-primary px-8 py-3 font-poppins font-medium text-xs tracking-widest rounded-sm w-full cursor-pointer"
                        type="submit"
                        value="Log In"
                    />
                )}
                {isPending && (
                    <input
                        disabled
                        className=" text-white bg-primary px-8 py-3 font-poppins font-medium text-xs tracking-widest rounded-sm w-full cursor-pointer"
                        type="submit"
                        value="Logging in ..."
                    />
                )}
            </form>
        </section>
    );
};

export default Login;
