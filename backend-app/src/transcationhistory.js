import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Navbar } from './navigation';
import Axios from 'axios';
const columns = [
  { id: 'customerId', label: 'Customer ID', minWidth: 100 ,align: 'center' },
  { id: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
  { id: 'recieverBic', label: 'Reciever BIC', minWidth: 100, align: 'center'},
  { id: 'recieverAccountNo', label: 'Reciever Account No', minWidth: 170,align: 'center'},
  { id: 'transcationNumberAmount', label: 'Transferred Amount', minWidth: 100,align: 'center'},
  { id: 'messageType', label: 'Message Code', minWidth: 100,align: 'center'},
  { id: 'transferType', label: 'Transfer Type', minWidth: 100,align: 'center'},
  { id: 'date', label: 'Date', minWidth: 100,align: 'center'}

];


export  function Transcationhistory() {
  const url="https://api.npoint.io/11dec604565f8daea72b";
  const[transcationhistory,setTranscationshitory]=useState([])
  useEffect(()=>{
    Axios.get(url).then((res)=>{
        setTranscationshitory(res.data);
    });
    },[]);
    console.log(transcationhistory)
    function createData(customerId, customerName, recieverBic, recieverAccountNo,transcationNumberAmount,messageType,transferType,date) {
        return { customerId, customerName, recieverBic, recieverAccountNo,transcationNumberAmount,messageType,transferType,date};
        }
    const rows = [];
    for(let i=0;i<transcationhistory.length;i++){
        rows.push(createData(transcationhistory[i].customerId,
                              transcationhistory[i].customerName,
                              transcationhistory[i].recieverBic,
                              transcationhistory[i].recieverAccountNo,
                              transcationhistory[i].transcationNumberAmount,
                              transcationhistory[i].messageType,
                              transcationhistory[i].transferType,
                              transcationhistory[i].date
                              ));
    }
    
    console.log(rows)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
    <Navbar/><br/><br/><br/><br/>
    <h3><center><b><u>Transcation History</u></b></center></h3>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
