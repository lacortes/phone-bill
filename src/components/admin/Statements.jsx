import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../providers/ApiProvider';
import months from '../../util/months';
import messageService from '../../core/services/messageService';

const Statements = () => {

    const [ statements, setStatements ] = useState([]);
    const [ successMsg, setSuccessMsg ] = useState(messageService.get());

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

    const onStatementClick = (month, year) => navigate(`${ year }-${ month }`);

    return (
        <>
            <Box mb={3}>
                {
                    successMsg && 
                        <Alert 
                            severity='success' 
                            onClose={() => {
                                setSuccessMsg(null);
                                messageService.reset();
                            }}>{successMsg}</Alert>
                }
            </Box>
            <Box mb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h3'>
                    Statements
                </Typography>
                <Button 
                    variant='contained' 
                    disableElevation 
                    size='small'
                    onClick={() => navigate('new')}
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
                        {statements.map(({ year, month, createDateTime }) => (
                            <TableRow 
                                key={`${ year }-${ month }`}
                                sx={{ cursor: 'pointer' }}
                                hover
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onStatementClick(month, year);
                                }}
                            >
                                <TableCell>{year}</TableCell>
                                <TableCell>{months[month]}</TableCell>
                                <TableCell>{new Date(createDateTime).toLocaleDateString('en-US')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Outlet />
        </> 
    );
};

export default Statements;