import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cognitoService from '../core/services/cognitoService';

const AuthenticatedRoute = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cognitoService.getUserSession()
            // eslint-disable-next-line no-unused-vars
            .then(session => {
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                navigate('/login', { replace: true });
            });
    }, [ navigate ]);

    
    return (isLoading ? (        
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color='primary' />
        </Backdrop>
    ) : children );

};

export default AuthenticatedRoute;