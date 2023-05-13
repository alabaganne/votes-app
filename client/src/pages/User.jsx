import { Card, UserModal } from '../components';
import { Logo, Logout } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import api from '../api';

function getUserVotes(userId) {
    return api.votes
        .get('/', {
            params: {
                userId,
            },
        })
        .then((res) => res.data);
}

const User = () => {
    const [events, setEvents] = useState([]);
    const [votes, setVotes] = useState([]);
    const user = useAuth()?.user;

    function getEvents() {
        const params = user.isAdmin ? {} : { regionId: user.regionId };
        return api.events.get('/', params).then((res) => setEvents(res.data));
    }
    function getVotes() {
        const params = user.isAdmin ? {} : { userId: user._id };
        api.votes.get('/', params).then((res) => {
            setVotes(res.data);
        });
    }

    useEffect(() => {
        if (user && user._id) {
            getEvents();
            getVotes();
        }
    }, [user]);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState({});

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleVoteClick(event) {
        setModalEvent(event);
        toggleModal();
    }

    if (!user) return null;

    return (
        <div>
            {/* User Navbar */}
            <div className="px-12 py-6 flex justify-between items-center border-b">
                <img src={Logo} alt="Logo" />
                <div className=" flex gap-10">
                    <button onClick={handleLogout} className="bg-transparent">
                        <img src={Logout} alt="Logout" />
                    </button>
                    <h1 className="">{user.username || 'Username'}</h1>
                </div>
            </div>

            <div className="container py-12">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">
                        {user.isAdmin ? 'All Events' : 'Events in your region'}
                    </h2>
                    <div>
                        {user.isAdmin && (
                            <Link className="btn-primary btn-lg">
                                Add Event
                            </Link>
                        )}
                    </div>
                </div>
                <div className="mt-14">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {events.length > 0 ? (
                            events.map((e) => (
                                <Card
                                    key={e._id}
                                    e={e}
                                    onVoteClick={() => {
                                        console.log('e', e);
                                        handleVoteClick(e);
                                    }}
                                    getEvents={() => getEvents()}
                                    votes={votes}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-400">
                                No events found
                            </div>
                        )}
                        {showModal && (
                            <UserModal
                                event={modalEvent}
                                toggleModal={toggleModal}
                                votes={votes}
                                getVotes={getVotes}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
