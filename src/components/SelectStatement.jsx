import { useEffect, useState, forwardRef } from 'react';
import months from '../util/months';

import { Box, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MuiAlert from '@mui/material/Alert';

import { useApi } from '../providers/ApiProvider';

const now = new Date();
const currentYear = now.getFullYear();

const years = (() => {
    const list = [];
    for (let start=2022; start <= currentYear; start++) {
        list.push(start);
    }
    return list;
})();

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  

const YearSelect = ({ year, setYear }) => {
    return (
        <>
            <InputLabel id="year-select">Year</InputLabel>
            <Select
                labelId="year-select"
                label="Year"
                id='year-select-id'
                value={year}
                onChange={e => setYear(e.target.value)}
            >
                {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
        </>
    );
};

const MonthSelect = ({ month, setMonth }) => {
    return (
        <>
            <InputLabel id="month-select">Month</InputLabel>
            <Select
                labelId="month-select"
                id="month-select-id"
                label="Month"
                value={month}
                onChange={e => setMonth(e.target.value)}
            >
                {Object.entries(months).map( monthArray => {
                    const [ key, month ] = monthArray;
                    return (<MenuItem key={key} value={key}>{month}</MenuItem>);
                })}
            </Select>
        </>
    );
};


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
                    <MonthSelect month={selectedMonth} setMonth={setSelectedMonth}/>
                </FormControl>
                <FormControl sx={{ m:1, minWidth: 100 }} size='small'>
                    <YearSelect year={selectedYear} setYear={setSelectedYear}/>
                </FormControl>
                <Box sx={{ position: 'relative' }}>
                    <Button 
                        size='small' 
                        onClick={() => onViewStatement()} 
                        variant='outlined' 
                        sx={{ 
                            height: 40, 
                            ml: 1, 
                        }}
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