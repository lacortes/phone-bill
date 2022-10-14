import { useEffect, useState } from 'react';
import { useApi } from '../providers/ApiProvider';

import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';

import PhoneBill from './PhoneBill';

const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};

const Dashboard = () => {
    const [ statement, setStatement ] = useState();
    const api = useApi();

    useEffect(() => {
        api.getDashboard().then(setStatement).catch(console.error);
    }, [ api ]);

    return (
        <>
            <AppBar position='static' sx={{ boxShadow: 'none' }}>
                <Container>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <Typography variant='h5'>{`${months[ statement?.month ] ?? '0'}, ${statement?.year ?? '0'}`}</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Container>
                <Stack gap={2}>
                    {
                        statement?.phoneStatements.map(s => <PhoneBill key={s.number} statement={s} />) 
                        ?? <h1>No Statement Found</h1>
                    }
                </Stack>
            </Container>
        </>
    );
};

export default Dashboard;