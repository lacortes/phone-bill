import { AccordionDetails, AccordionSummary, Table, TableRow, TableBody, TableCell, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StatementAccordion from './StatementAccordion';


const defaultStatement = { number: '0000', total: 0.00, details: [{ id: 0, description: 'N/A', amount: 0.00 }] };

const FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formatNumber = number => FORMATTER.format(number);

const PhoneBill = ({ statement=defaultStatement }) => {
    const { number, total, details } = statement;
    return (
        <StatementAccordion square={true}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelia-content"
                id="panelia-header"
            >
                <Typography sx={{ width: '50%', flexShrink: 0 }}>{number}</Typography>
                <Typography sx={{ color: 'text.secondary', paddingLeft: '16px' }}>{formatNumber(total)}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Table>
                    <TableBody>
                        {details.map(detail => (
                            <TableRow 
                                key={detail.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{detail.title}</TableCell>
                                <TableCell align="left">{formatNumber(detail.amount)}</TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </AccordionDetails>
        </StatementAccordion>
    );
};

export default PhoneBill;