import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import '../styles/app.scss';
import PhoneBill from './PhoneBill';
import phoneData from '../phoneTest.json';

const App = () => {
    const [ statement, setStatement ] = useState();
    
    const fetchData = async () => {
        setStatement(phoneData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <AppBar position='static' sx={{ boxShadow: 'none' }}>
                <Container>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <Typography variant='h5'>{statement?.monthYear}</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Container>
                <Stack gap={2}>
                    {statement?.phoneStatements.map(s => <PhoneBill key={s.number} statement={s} />)}
                </Stack>
            </Container>
        </>
    );
};

export default App;