import { Navbar } from './navigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export function Customerset(){
    return(
        <div>
            <Navbar/><br/><br/><br/><br/>
            <h1><center>Create Customer Password</center></h1>
            <center>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 4, width: '25ch' },
                }}
                >
                <TextField id="customerId" label="Customer ID" variant="outlined" />
                <TextField id="customerName" label="Customer Name" variant="outlined" disabled  />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 4, width: '25ch' },
                }}
                >
                <TextField id="createPassword" label="Create Password" variant="outlined" />
                <TextField id="confirmPassword" label="Confirm Password" variant="outlined" />
            </Box></center><br/><br/>
            <center><Button variant="contained">Submit</Button></center><br/>
        </div>
    )
}