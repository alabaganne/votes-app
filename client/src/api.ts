import axios from 'axios';
import {
    authServiceUrl,
    eventsServiceUrl,
    resultsServiceUrl,
    votesServiceUrl,
} from '../../urls';

const authApi = axios.create({ baseURL: authServiceUrl });
const eventsApi = axios.create({ baseURL: eventsServiceUrl });
const votesApi = axios.create({ baseURL: votesServiceUrl });
const resultsApi = axios.create({ baseURL: resultsServiceUrl });

export default {
    authApi,
    eventsApi,
    votesApi,
    resultsApi,
};
