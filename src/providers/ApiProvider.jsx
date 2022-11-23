import React, { useContext } from 'react';

import { getDashboard, getStatement } from '../core/api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider value={{ getDashboard, getStatement }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;