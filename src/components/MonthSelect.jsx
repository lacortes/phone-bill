import { InputLabel, MenuItem, Select } from '@mui/material';
import months from '../util/months';

const MonthSelect = ({ month, onMonthSelected }) => {
    return (
        <>
            <InputLabel id="month-select">Month</InputLabel>
            <Select
                labelId="month-select"
                id="month-select-id"
                label="Month"
                value={month}
                onChange={e => onMonthSelected(e.target.value)}
            >
                {Object.entries(months).map( monthArray => {
                    const [ key, month ] = monthArray;
                    return (<MenuItem key={key} value={key}>{month}</MenuItem>);
                })}
            </Select>
        </>
    );
};

export default MonthSelect;