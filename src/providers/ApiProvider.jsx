import React, { useContext } from 'react';

import { getDashboard } from '../core/api';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider value={{ getDashboard }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiProvider;