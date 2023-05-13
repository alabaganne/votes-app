import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { useEffect, useState } from 'react';

const Card = ({ e, onVoteClick, getEvents, votes }) => {
    function onDelete() {
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
                            to={'/event/' + e._id}
                            className="btn-black text-xs"
                        >
                            Show
                        </Link>
                        <button
                            className="btn-danger text-xs"
                            onClick={onDelete}
                        >
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
