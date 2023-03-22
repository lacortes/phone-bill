import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useApi } from '../../providers/ApiProvider';
import PhoneLine from './PhoneLine';

let index = 0;
const MIN_DATE = dayjs(new Date(2022, 1, 1));
const MAX_DATE = dayjs().add(1, 'year'); 
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const CreateStatement = () => {
    const [ lines, setLines ] = useState([]);
    const [ dueDate, setDueDate ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState();
    const [ total, setTotal ]  = useState(0.0);
    const api = useApi();

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

    const prepareStatement = () => {
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
            createDateTime: (new Date()).toISOString(),
            phoneStatements: lines.map(prepareLineItem) // Update ids
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
                            } else {
                                createStatement(prepareStatement());
                            }
                        }}
                    >
                        Create
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

export default CreateStatement;