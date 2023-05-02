import { Backdrop, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { getDashboard, getStatement, makeAuthApi } from '../core/api';
import cognitoService from '../core/services/cognitoService';

const ApiContext = React.createContext(null);

export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children }) => {

    const [ authApi, setAuthApi ] = useState();

    useEffect(() => {
        (async () => {
            try {
                const session = await cognitoService.getUserSession();
                const token = session.getAccessToken().getJwtToken();

                setAuthApi(makeAuthApi({ token })());
            } catch (err) {
                console.error(err);
                setAuthApi({});
            }
        })();
    }, []);

    return (
        
        !authApi ? 
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <div data-teastid='circular-progress'>
                    <CircularProgress color='primary' />
                </div>
            </Backdrop> : 
            <ApiContext.Provider 
                value={{ 
                    getDashboard, 
                    getStatement,
                    getStatementDashboard: authApi.getStatementDashboard,
                    createStatement: authApi.createStatement,
                    updateStatement: authApi.updateStatement,
                }}
            >
                {children}
            </ApiContext.Provider>
    );
};

export default ApiProvider;