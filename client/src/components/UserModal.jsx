import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Close } from '../assets';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const UserModal = ({ event, toggleModal, getVotes }) => {
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const user = useAuth().user;

    function submit() {
        const vote = {
            eventId: event._id,
            optionId: selectedOptionId,
            userId: user._id,
        };

        api.votes
            .post(vote)
            .then((res) => {
                getVotes();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return ReactDOM.createPortal(
        <section className="fixed inset-0 z-50 flex items-center justify-center m-4">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white max-w-xl w-full sm:p-8 p-4 rounded-xl z-10 items-center shadow-lg">
                <div className=" w-full flex justify-end">
                    <img
                        src={Close}
                        alt="close"
                        className="cursor-pointer "
                        onClick={toggleModal}
                    />
                </div>
                <div className="text-sm text-center">
                    <h3 className="text-green-600 font-poppins text-3xl font-bold text-center">
                        {event.name}
                    </h3>
                    <div className="text-gray-400">
                        from{' '}
                        <span className="text-gray-900">
                            {new Date(event.startDate).toLocaleDateString()}
                        </span>{' '}
                        to{' '}
                        <span className="text-gray-900">
                            {new Date(event.endDate).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="mt-4 text-gray-400">{event.description}</p>
                </div>
                <div className=" w-full mt-16 flex flex-col gap-4 overflow-y-auto">
                    {event &&
                        event.options.map((o, i) => (
                            <div
                                key={o._id}
                                className={
                                    'border border-green-600 rounded-lg text-sm font-medium text-green-600 w-full px-6 py-4 flex flex-row justify-between items-center transition-all duration-75 ' +
                                    (selectedOptionId === o._id
                                        ? '!bg-green-600 !text-white '
                                        : '') +
                                    (user.isAdmin
                                        ? ''
                                        : 'cursor-pointer hover:bg-green-600 hover:text-white')
                                }
                                onClick={() =>
                                    !user.isAdmin && setSelectedOptionId(o._id)
                                }
                            >
                                <p className=" w-[70%]">{o.name}</p>
                                {selectedOptionId != o._id && <div>-&gt;</div>}
                            </div>
                        ))}
                </div>
                <div className="mt-10 flex justify-end gap-3">
                    <button className="btn-outline-gray" onClick={toggleModal}>
                        {user.isAdmin ? 'Close' : 'Cancel'}
                    </button>
                    {!user.isAdmin && (
                        <button onClick={submit} className="btn-primary">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </section>,
        document.body
    );
};

export default UserModal;
