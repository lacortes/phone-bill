import { useEffect, useState, forwardRef } from 'react';

import { Box, Button, FormControl, CircularProgress, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MuiAlert from '@mui/material/Alert';

import { useApi } from '../providers/ApiProvider';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SelectStatement = ({ onSuccess, month='', year='' }) => {
    const [ selectedMonth, setSelectedMonth ] = useState(month);
    const [ selectedYear, setSelectedYear ] = useState(year);
    const [ isLoading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ failure, setFailure ] = useState(false);

    useEffect(() => {
        setSuccess(false);
    }, [ selectedMonth, selectedYear ]);

    const api = useApi();

    const onViewStatement = async () => {
        if (isLoading || success || failure) {
            return;
        }

        try {
            setLoading(true);
            const statement = await api.getStatement(selectedMonth, selectedYear);
            onSuccess(statement);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setFailure(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setFailure(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormControl sx={{ m:1, minWidth: 125 }} size='small'>
                    <MonthSelect month={selectedMonth} onMonthSelected={setSelectedMonth}/>
                </FormControl>
                <FormControl sx={{ m:1, minWidth: 100 }} size='small'>
                    <YearSelect year={selectedYear} onYearSelected={setSelectedYear}/>
                </FormControl>
                <Box sx={{ position: 'relative' }}>
                    <Button 
                        size='small' 
                        onClick={() => onViewStatement()} 
                        variant='outlined' 
                        sx={{   ml: 1, }}
                        disabled={isLoading || failure}
                        endIcon={success && <CheckIcon/>}
                    >
                    view
                    </Button>
                    {
                        isLoading && (
                            <CircularProgress
                                color="secondary"
                                size={30}
                                sx={{ 
                                    position: 'absolute',
                                    top: 5,
                                    left: 25,
                                    zIndex: 1
                                }}
                            />
                        )
                    }
                </Box>
                <Snackbar
                    open={failure}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity='error'>Statement not found!</Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default SelectStatement; 