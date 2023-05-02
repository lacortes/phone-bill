import axios from 'axios';
import { API_ROOT } from '../core/config/environment';


const api = axios.create({ baseURL: API_ROOT });


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

const makeAuthApi = ({ token }) => {
    const authApi = axios.create({ baseURL: API_ROOT, headers: { Authorization: `Bearer ${token}` } });

    return () => {
        
        const getStatementDashboard = async () => {
            try {
                const { data: { statements } } = await authApi.get('/statements');
                return Promise.resolve(statements);
            } catch (err) {
                return Promise.reject(err);
            }
        };

        const createStatement = async (statement) => {
            try {
                await authApi.post('/statements', statement);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        };

        const updateStatement = async (statement) => {
            const { year, month } = statement;

            const statementId = `${year}-${month}`;
            try {
                await authApi.put(`/statements/${ statementId }`, statement);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        };

        return Object.freeze({ getStatementDashboard, createStatement, updateStatement });

    };
};

const getDashboard = async () => fetchStatement('0-0');
const getStatement = async (month, year) => fetchStatement(`${year}-${month}`);

export {
    getDashboard, 
    getStatement,
    makeAuthApi
};