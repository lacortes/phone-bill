import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cognitoService from '../core/services/cognitoService';

const CheckIfLoggedIn = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        cognitoService.getUserSession()
            .then(() => navigate('/admin/statements'))
            .catch(() => setIsLoading(false));
    }, [ navigate ]);

    return (isLoading ? 
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <div data-teastid='circular-progress'>
                <CircularProgress color='primary' />
            </div>
        </Backdrop>  
        : children
    );
};

export default CheckIfLoggedIn;