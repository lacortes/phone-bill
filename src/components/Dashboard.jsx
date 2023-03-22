import { useEffect, useState } from 'react';
import { useApi } from '../providers/ApiProvider';
import months from '../util/months';

import { AppBar, Box, Container, Stack, Toolbar, Typography } from '@mui/material';

import PhoneBill from './PhoneBill';
import LoadingStatement from './LoadingStatement';
import SelectStatement from './SelectStatement';

const Dashboard = () => {
    const [ statement, setStatement ] = useState();
    const api = useApi();

    useEffect(() => {
        api.getDashboard().then(setStatement).catch(err => console.error(err.response));
    }, [ api ]);

    return (
        <>
            {
                statement?.phoneStatements.length ?? 0 > 0 ? (
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
                            <Box mb={4}>
                                <SelectStatement onSuccess={setStatement} month={statement.month} year={statement.year} />
                            </Box>
                            <Stack gap={2}>
                                {
                                    statement.phoneStatements.map(s => <PhoneBill key={s.number} statement={s} />) 
                                }
                            </Stack>
                        </Container>
                    </>
                ) : (
                    <LoadingStatement />
                )
            }
            
        </>
    );
};

export default Dashboard;