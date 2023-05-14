import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Add, Close } from '../assets';
import api from '../api';

const Creation = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const [regions, setRegions] = useState([]);
    useEffect(() => {
        api.users.get('/regions').then((res) => setRegions(res.data));
    }, []);

    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        regionId: undefined,
        options: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        api.events
            .post('/', newEvent)
            .then((res) => {
                setIsPending(false);
                navigate('/events');
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
            });
    };

    const [newOptionName, setNewOptionName] = useState('');
    const addOption = () => {
        if (newOptionName === '') {
            alert('Option name cannot be empty');
            return;
        }

        // Check if option already exists
        if (newEvent.options.find((o) => o.name === newOptionName)) {
            alert('Option already exists');
            return;
        }
        newEvent.options.push({ name: newOptionName });
        setNewEvent({ ...newEvent });
        setNewOptionName('');
    };
    const deleteOption = (optionName) => {
        newEvent.options = newEvent.options.filter(
            (o) => o.name !== optionName
        );
        setNewEvent({ ...newEvent });
    };

    return (
        <form className="py-2 w-full max-w-md">
            <div className="form-group">
                <h1 className="text-3xl font-bold">Add Event</h1>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={newEvent.name}
                    onChange={(e) => {
                        newEvent.name = e.target.value;
                        setNewEvent({ ...newEvent });
                    }}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    className="form-control resize-none"
                    type="text"
                    name="year"
                    value={newEvent.description}
                    onChange={(e) => {
                        newEvent.description = e.target.value;
                        setNewEvent({ ...newEvent });
                    }}
                    rows={5}
                />
            </div>
            <div className="form-group">
                <label>Region</label>
                <select
                    className="form-control"
                    name="regionId"
                    value={newEvent.regionId}
                    onChange={(e) => {
                        newEvent.regionId = e.target.value;
                        setNewEvent({ ...newEvent });
                    }}
                >
                    <option value={null}>Select a region</option>
                    {regions.map((region) => (
                        <option key={region._id} value={region._id}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Options List</label>
                <div className="flex justify-center items-center">
                    <input
                        className="form-control rounded-r-none"
                        type="text"
                        name="list"
                        value={newOptionName}
                        onChange={(e) => setNewOptionName(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={addOption}
                        className="mt-1 py-1.5 px-4 border border-l-0 hover:bg-gray-50 duration-75 rounded-r-md"
                    >
                        <img src={Add} alt="Add" className="h-8 w-8" />
                    </button>
                </div>
                <div className="mt-4 w-full max-h-36 overflow-x-auto rounded-sm flex flex-col gap-2">
                    {newEvent.options.map((option, i) => (
                        <div
                            className="flex w-full justify-between items-center gap-4 rounded-md py-2 px-4 bg-green-100 text-green-800 text-sm"
                            key={i}
                            onClick={() => deleteOption(option.name)}
                        >
                            <p className="  w-[70%] break-normal">
                                {option.name}
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                {!isPending && (
                    <input
                        className="btn-primary btn-lg w-full"
                        type="button"
                        value="Submit"
                        onClick={handleSubmit}
                    />
                )}
                {isPending && (
                    <input
                        disabled
                        className="btn-primary btn-lg w-full"
                        type="button"
                        value="Loading ..."
                    />
                )}
                <Link
                    to="/events"
                    className="mt-6 btn-outline-gray btn-lg w-full"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default Creation;
