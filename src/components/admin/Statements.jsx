import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../providers/ApiProvider';
import months from '../../util/months';

const Statements = () => {

    const [ statements, setStatements ] = useState([]);
    const navigate = useNavigate();
    const api = useApi();

    useEffect(() => {
        (async () => {
            try {
                setStatements(await api.getStatementDashboard());
            } catch (err) {
                console.error(err);
            }
        })();
    }, [ api ]);

    return (
        <>
            <Box mb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>
                    Statements
                </Typography>
                <Button 
                    variant='contained' 
                    disableElevation 
                    size='small'
                    onClick={() => navigate('createStatement')}
                >
                    Create Statement
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>Create  Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statements.map(makeRow)}
                    </TableBody>
                </Table>
            </TableContainer>

            <Outlet />
        </> 
    );
};

const makeRow = (statement) => {
    const { month, year, createDateTime } = statement;
    const monthText = months[month];

    return ( 
        <TableRow key={`${ year }-${ month }`}>
            <TableCell>{year}</TableCell>
            <TableCell>{monthText}</TableCell>
            <TableCell>{new Date(createDateTime).toLocaleDateString('en-US')}</TableCell>
        </TableRow>
    );
};

export default Statements;