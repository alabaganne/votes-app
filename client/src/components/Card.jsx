import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { useEffect, useState } from 'react';

const Card = ({ e, onVoteClick, getEvents, votes }) => {
    function onDelete() {
        if (!confirm('Are you sure you want to delete this event?')) return;

        api.events
            .delete('/' + e._id)
            .then((res) => {
                getEvents();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [voted, setVoted] = useState(false);
    useEffect(() => {
        setVoted(false);
        for (let i = 0; i < votes.length; i++) {
            if (votes[i].eventId === e._id) {
                setVoted(true);
                break;
            }
        }
    }, [votes]);

    const user = useAuth().user;
    return (
        <div className="border-solid border rounded-lg flex flex-col gap-12 justify-between items-center px-8 py-10">
            <div className="text-center">
                <h3 className="text-green-600 font-poppins font-bold text-2xl text-center">
                    {e.name}
                </h3>
                <div className="text-sm text-gray-400">
                    from{' '}
                    <span className="text-gray-900">
                        {new Date(e.startDate).toLocaleDateString()}
                    </span>{' '}
                    to{' '}
                    <span className="text-gray-900">
                        {new Date(e.endDate).toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-6 text-sm text-gray-400">
                    {e.description}
                </div>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-2">
                {user.isAdmin && (
                    <>
                        <Link
                            to={'/events/' + e._id}
                            className="btn-black text-xs"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path
                                    fillRule="evenodd"
                                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Show
                        </Link>
                        <button
                            className="btn-danger text-xs"
                            onClick={onDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Delete
                        </button>
                    </>
                )}
                {!user.isAdmin && (
                    <>
                        {voted ? (
                            <button
                                type="button"
                                className="btn text-xs bg-gray-100 hover:bg-gray-200"
                                onClick={onVoteClick}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Voted
                            </button>
                        ) : (
                            <button
                                className="btn-primary text-xs flex-shrink-0"
                                onClick={onVoteClick}
                            >
                                Vote -&gt;
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
