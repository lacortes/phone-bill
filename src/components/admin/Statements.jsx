import {
    Alert,
    Box,
    Button, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Popper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../providers/ApiProvider';
import months from '../../util/months';
import messageService from '../../core/services/messageService';

const Statements = () => {
    const [ statements, setStatements ] = useState([]);
    const [ successMsg, setSuccessMsg ] = useState(messageService.get());
    const [ anchorEl, setAnchorEl ] = useState();
    const [ selectedPhone, setSelectedPhone ] = useState({ });

    const navigate = useNavigate();
    const api = useApi();

    const menuOpen = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    useEffect(() => {
        (async () => {
            try {
                setStatements(await api.getStatementDashboard());
            } catch (err) {
                console.error(err);
            }
        })();
    }, [ api ]);

    const handleMenuClick = (event, month, year) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setSelectedPhone({ month, year });
        
    };
    const onStatementClick = (month, year) => navigate(`${ year }-${ month }`);

    return (
        <div>
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
                            <TableCell colSpan={1}></TableCell>
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
                                <TableCell 
                                    colSpan={1} 
                                    align='right'>
                                    <IconButton
                                        aria-describedby={id}
                                        sx={{ '&:hover': { backgroundColor: 'unset', opacity: 1 }, }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuClick(e, month, year);
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Popper open={menuOpen} anchorEl={anchorEl} placement='bottom-end'>
                                        <Paper>
                                            <List>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemText
                                                            primary="Clone"
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                navigate(`${ selectedPhone.year }-${ selectedPhone.month }/clone`);
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </Paper>
                                    </Popper>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Outlet />
        </div>
    );
};

export default Statements;