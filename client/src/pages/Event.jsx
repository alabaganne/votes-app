import React, { useEffect } from 'react';

const Event = () => {
    const eventId = useParams().eventId;
    const [event, setEvent] = useState({});

    function getEvent(eventId) {
        return api.events.get('/' + eventId).then((res) => setEvent(res.data));
    }

    useEffect(() => {
        getEvent(eventId);
    }, []);

    return <div>Event</div>;
};

export default Event;
