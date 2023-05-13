import axios from 'axios';
import urls from './urls';

// available routes: /login
// POST to /: create user
// /verify: verify token
// /regions: return list of regions in the db
const users = axios.create({ baseURL: urls.userServiceUrl });
const events = axios.create({ baseURL: urls.eventsServiceUrl });
const votes = axios.create({ baseURL: urls.votesServiceUrl });
const results = axios.create({ baseURL: urls.resultsServiceUrl });

function setApiTokens(token) {
    users.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    events.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    votes.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    results.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default {
    users,
    events,
    votes,
    results,
    setApiTokens,
};
