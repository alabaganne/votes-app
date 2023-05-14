import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useParams } from 'react-router-dom';

const Event = () => {
    const eventId = useParams().eventId;
    const [event, setEvent] = useState(null);
    const [results, setResults] = useState(null);
    const [region, setRegion] = useState({});
    const [totalVotes, setTotalVotes] = useState(0);

    function deleteEvent() {
        let c = confirm('Are you sure you want to delete this event?');
        if (!c) return;

        api.events
            .delete('/' + event._id)
            .then((res) => {
                window.location.href = '/events';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        api.events.get('/' + eventId).then((res) => setEvent(res.data));
        api.results.get('/').then((res) => setResults(res.data));
        api.users.get('/regions').then((res) => {
            const regions = res.data;
            if (!event) return console.log('no event');
            for (let i = 0; i < regions.length; i++) {
                if (regions[i]._id === event.regionId) {
                    setRegion(regions[i]);
                    console.log(regions[i]);
                    break;
                }
            }
        });
    }, []);

    if (!event || !results) return <div>Loading...</div>;
    console.log('results', results);
    console.log('event.options', event.options);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1>
                        {event.name}{' '}
                        <span className="text-xs text-gray-400 font-normal">
                            {region.name}
                        </span>
                    </h1>
                    <div className="mt-2 text-gray-400 text-sm">
                        {event.description}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Link to="/events" className="btn btn-lg btn-gray">
                        &lt;- Go back
                    </Link>
                    <button
                        className="btn btn-lg btn-danger"
                        onClick={deleteEvent}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <div className="border border-b-0 max-w-xs">
                    {event &&
                        event.options.map((option) => {
                            let votes = results[option._id] || 0;
                            return (
                                <div
                                    key={option._id}
                                    className="flex items-center justify-between border-b px-8 py-2"
                                >
                                    <div>
                                        <div className="text-green-600 font-bold">
                                            {option.name}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-2xl font-bold">
                                            {votes}{' '}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            votes
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Event;
