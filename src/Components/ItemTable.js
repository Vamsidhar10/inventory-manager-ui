import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

const ItemTable = ({ items }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6" fontWeight="bold">SKU</Typography></TableCell>
                        <TableCell><Typography variant="h6" fontWeight="bold">Name</Typography></TableCell>
                        <TableCell><Typography variant="h6" fontWeight="bold">Tags</Typography></TableCell>
                        <TableCell><Typography variant="h6" fontWeight="bold">Category</Typography></TableCell>
                        <TableCell><Typography variant="h6" fontWeight="bold">In Stock Count</Typography></TableCell>
                        <TableCell><Typography variant="h6" fontWeight="bold">Available Stock</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                {item.tags.map((tag, index) => (
                                    <Button key={index} variant="outlined" size='small' style={{ margin: '2px' }}>{tag.name}</Button>
                                ))}
                            </TableCell>
                            <TableCell>{item.category.name}</TableCell>
                            <TableCell>{item.stock_quantity.in_stock}</TableCell>
                            <TableCell>{item.stock_quantity.available_stock}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ItemTable;
