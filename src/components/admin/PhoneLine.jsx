import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Input, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { NumericFormat } from 'react-number-format';

const phonePattern = /^\d+/;
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const defaultCell = { row:-1, col: -1 };

const PhoneLine = ({ line, onDelete, onUpdate }) => {
    const [ showDialog, setShowDialog ] = useState(false);
    const [ selectedCell, setSelectedCell ] = useState(defaultCell);

    const { details, total } = line;

    const calcTotal = items => items
        .map(item => item.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0.00);

    const onItemUpdate = (action) => {
        const { type, payload } = action;

        if (type === 'delete') {
            const newDetails = details.filter(d => d.id !== payload);
            onUpdate({ ...line, details: newDetails, total: calcTotal(newDetails) });
        } else if (type === 'update') {
            const newDetails = details.map(d => {
                if (d.id === payload.id) {
                    return payload;
                }
                return d;
            });
            onUpdate({  ...line, details: newDetails, total: calcTotal(newDetails) });
        }
    };

    return (
        <>
            <Accordion 
                square 
                sx={{ width: '50%' }}
                onClick={() => setSelectedCell(defaultCell)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ '& .MuiAccordionSummary-content': { alignItems: 'baseline' } }}
                >
                    <Box sx={{ width: '20%', flexShrink: 0 }}>
                        <Input
                            onClick={e => {
                                e.stopPropagation();
                            }}
                            sx={{ width: 40 }}
                            value={line.number}
                            onChange={e => {
                                const newPhone = e.target.value;

                                if (newPhone.length > 0 && (!phonePattern.test(newPhone) || newPhone.length > 4)) {
                                    return;
                                }
                        
                                onUpdate({ ...line, number: newPhone });
                            }}
                        />      
                    </Box>
                
                    <Typography  sx={{ color: 'text.secondary' }}>Total: {USDollar.format(total)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer sx={{ width: '100%', maxHeight: 200 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'70%'}>Title</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {line.details.map((line, idx) => 
                                    <NewItem
                                        key={line.id}
                                        idx={idx} 
                                        item={line} 
                                        onItemUpdate={onItemUpdate}
                                        selectedCell={selectedCell} 
                                        setSelectedCell={setSelectedCell}
                                    />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
                <AccordionActions>
                    <Button 
                        variant='contained'
                        disableElevation
                        size='small'
                        onClick={e => {
                            e.stopPropagation();

                            const newDetails = [ ...line.details, {
                                id: line.details.length,
                                title: 'title',
                                amount: 0.00
                            }];
                            onUpdate({ ...line, details: newDetails });
                        }}
                    >
                        Add Item
                    </Button>
                    <Button
                        onClick={e => {
                            e.stopPropagation();   
                            setShowDialog(true);
                        }}
                    >
                    Delete
                    </Button>
                </AccordionActions>
            </Accordion>
            <Dialog
                open={showDialog}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete line {line.number}?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                        <Button autoFocus onClick={() => onDelete(line)}>Agree</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            decimalScale={2}
            thousandSeparator
            prefix='$'
        />
    );
});

const ShortCell = styled(TableCell)({
    paddingTop: 5,
    paddingBottom: 5
}); 
const NewItem = ({ idx, item, onItemUpdate, selectedCell, setSelectedCell }) => {
    const { id, title, amount } = item;
    const { row, col } = selectedCell;

    return (
        <TableRow>
            <ShortCell
                onClick={e => {
                    e.stopPropagation();
                    setSelectedCell({ row: idx, col: 0 });
                }}
            >
                {
                    row === idx && col === 0 ?
                        (<TextField
                            value={title}
                            margin='none'
                            sx={{ '.MuiOutlinedInput-input': { padding: 1 } }}
                            onChange={e => {
                                onItemUpdate({ type: 'update', payload: { ...item, title: e.target.value } });
                            }}
                        />)
                        : <Typography color="font.secondary">{ title }</Typography>
                }
            </ShortCell>
            <ShortCell
                onClick={e =>{
                    e.stopPropagation();
                    setSelectedCell({ row: idx, col: 1 });
                }}
            >
                {
                    row === idx && col === 1 ? 
                        ( <Input 
                            value={amount}
                            inputComponent={NumericFormatCustom}
                            onChange={e => {
                                onItemUpdate({ type: 'update', payload: { ...item, amount: Number(e.target.value) } });
                            }}
                        />)
                        : (USDollar.format(amount)) 
                }
            </ShortCell>
            <ShortCell>
                <IconButton
                    sx={{ 
                        '&': { opacity: 0 },
                        '&:hover': { backgroundColor: 'unset', opacity: 1 }, 
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        setSelectedCell(defaultCell);
                        onItemUpdate({ type: 'delete', payload: id });
                    }}
                >
                    <DeleteOutlineOutlinedIcon color='secondary' />
                </IconButton>
            </ShortCell>
        </TableRow>
    );
};

export default PhoneLine;