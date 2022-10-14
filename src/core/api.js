import axios from 'axios';
import { API_ROOT } from '../core/config/environment';

const api = axios.create({ baseURL: API_ROOT });


const getStatement = async statementID => {
    if (!statementID) {
        return Promise.reject();
    }

    try {
        const { data } = await api.get(`/statements/${ statementID }`);
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }

};

const getDashboard = async () => getStatement('0-0');

export {
    getDashboard
};