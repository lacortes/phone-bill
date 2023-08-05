import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useApi } from '../../providers/ApiProvider';
import PhoneLine from './PhoneLine';
import messageService from '../../core/services/messageService';
import { useLocation } from 'react-router-dom';

let index = 0;
const MIN_DATE = dayjs(new Date(2022, 1, 1));
const MAX_DATE = dayjs().add(1, 'year'); 
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const StatementView = () => {
    const [ lines, setLines ] = useState([]);
    const [ dueDate, setDueDate ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState();
    const [ successMsg, setSuccessMsg ] = useState();
    const [ total, setTotal ]  = useState(0.0);
    const [ isEditMode, setIsEditMode ] = useState(false);
    const location = useLocation();

    const api = useApi();
    const statement = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        const myFunction = (e) => {
            e.preventDefault();

            e.returnValue = '';
        };

        window.addEventListener('beforeunload', myFunction);

        return () => {
            window.removeEventListener('beforeunload', myFunction);
        };
    }, []);

    useEffect(() => {   
        if (!statement) return;
        
        const { dueDay, month, year, phoneStatements, total } = statement;
        
        setIsEditMode(true);
        setDueDate(dayjs(new Date(year, month - 1, dueDay)));
        setTotal(total);
        
        setLines(phoneStatements.map((line, idx) => ({ ...line, id: idx })));

    }, [ statement ]);

    useEffect(() => {
        const ending = location.pathname.split('/').at(-1);
        if (ending === 'clone') {
            setIsEditMode(false);
        }
    }, [ location ]);

    const onDeleteLine = (line) => {
        setLines(lines.filter(l => l.id !== line.id));
    };

    const onUpdateLine = (updatedLine) => {
        
        const newLines = lines.map(l => {
            if (l.id === updatedLine.id) {
                return updatedLine;
            }
            return l;
        });
        const updatedTotal = newLines.map(l  => l.total).reduce((accumulator, currentValue) => accumulator + currentValue, 0.00);
        
        setTotal(updatedTotal);
        setLines(newLines);
    
    };

    const prepareStatement = (overrides) => {
        const dueDay = dueDate.get('date');
        const month = dueDate.get('month') + 1; // In our app, Jan starts at 1
        const year = dueDate.get('year');

        const prepareLineItem = (line, idx) => {
            const updatedDetails = line.details.map((item, idx) => ({ ...item, id: idx }));
            return { ...line, details: updatedDetails, id: idx };
        };

        return {
            dueDay,
            month,
            year, 
            total, 
            phoneStatements: lines.map(prepareLineItem), // Update ids,
            ...overrides
        };
    };

    const checkForErrorMsgs = () => {
        lines.forEach(line => {
            const { number } = line;
            if (number === '0000') {
                return 'Cannot use 0000 as a number';
            }
        });

        return null;
    };

    const createStatement = async (statement) => {
        try {
            await api.createStatement(statement);
            messageService.set('Successfully created statement');
            navigate('/admin/statements');
        } catch (err) {
            if (err.response) {
                setErrorMsg(err.response.data.error);
            } else {
                setErrorMsg('Unknownn error');
            }
        }
    };

    const updateStatement = async (statement) => {
        try {
            await api.updateStatement(statement);
            setSuccessMsg('Update successful');
        } catch (err) {
            if (err.response) {
                setErrorMsg(err.response.data.error);
            } else {
                setErrorMsg('Unknownn error');
            }
        }
    };

    const invalidPhoneNumbers = () => {
        return lines.some(l => l.number === '0000');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={5}>
                {
                    errorMsg && <Alert severity='error' onClose={() => setErrorMsg(null)}>{errorMsg}</Alert>
                }
                {
                    successMsg && <Alert security='success' onClose={() => setSuccessMsg(null)}>{successMsg}</Alert>
                }
                
                <Stack direction='row' justifyContent='flexStart' alignItems='center' spacing={30}>
                    <DatePicker 
                        label="Due Date"
                        value={dueDate}
                        onChange={setDueDate}  
                        minDate={MIN_DATE}
                        maxDate={MAX_DATE}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button
                        variant='outlined'
                        size='large'
                        disabled={lines.length < 1 || dueDate === null || dueDate === null || invalidPhoneNumbers()}
                        onClick={() => {
                            const msg = checkForErrorMsgs();
                        
                            if (msg) {
                                setErrorMsg(msg);
                            } else if (isEditMode) {
                                updateStatement(prepareStatement({ 
                                    lastUpdateDateTime: statement.lastUpdateDateTime,
                                    createDateTime: statement.createDateTime
                                }));
                            } else {
                                createStatement(prepareStatement());
                            }
                        }}
                    >
                        {isEditMode ? 'Update' :  'Create' }
                    </Button>
                </Stack>
            
                {
                    lines.length > 0 && (
                        <Stack>
                            {lines.map((line) => 
                                <PhoneLine key={line.id} line={line} onDelete={onDeleteLine} onUpdate={onUpdateLine}/>
                            )}
                        </Stack>
                    )
                }

                <Typography pl={1} fontSize={22} >Total: {USDollar.format(total)}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                    <Button
                        variant='contained'
                        disableElevation
                        size='large'
                        onClick={() => {
                            const newLine = {
                                id: index++, number: '0000', details: [], total: 0.00 
                            };
                            setLines([ ...lines, newLine ]);
                        }}
                    >
                    + Add Line
                    </Button>
                </Box>
            </Stack>
        </LocalizationProvider>
    );
};

export default StatementView;