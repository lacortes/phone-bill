import { InputLabel, MenuItem, Select } from '@mui/material';
import getYears from '../util/years';

const years = getYears();
const YearSelect = ({ year, onYearSelected }) => {
    return (
        <>
            <InputLabel id="year-select">Year</InputLabel>
            <Select
                labelId="year-select"
                label="Year"
                id='year-select-id'
                value={year}
                onChange={e => onYearSelected(e.target.value)}
            >
                {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
        </>
    );
};

export default YearSelect;