import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.cortes-debt.com' });


const fetchStatement = async statementID => {
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

const getDashboard = async () => fetchStatement('0-0');
const getStatement = async (month, year) => fetchStatement(`${year}-${month}`);

export {
    getDashboard, 
    getStatement
};