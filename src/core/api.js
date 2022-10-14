import axios from 'axios';

const api = axios.create({ baseURL: 'https://rpvh9gz96b.execute-api.us-west-1.amazonaws.com' });


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