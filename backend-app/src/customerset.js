import { Navbar } from './navigation';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
export function Customerset(){
    const location=useLocation()
    const navigate=useNavigate()
    const setPassword=()=>{
        Axios.post("http://localhost:8080/auth/set_customer_credentials/",{
            "customerId":document.getElementById("customerId").value,
            "username":document.getElementById("username").value,
            "password":document.getElementById("createPassword").value
        })
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{
            if(err.response.status==400)
            {
                alert(err.response.data.message)
            }
        })
    }
    if((location.state!==null)?location.state.user:null){
        return (
            <div>
                <Navbar {...location.state}/><br/><br/><br/><br/>
                <h1><center>Create Customer Password</center></h1>
                <center>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 4, width: '25ch' },
                    }}
                    >
                    <TextField id="customerId" label="Customer ID" variant="outlined" />
                    <TextField id="username" label="username" variant="outlined" />
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
                <center><Button onClick={setPassword} variant="contained">Submit</Button></center><br/>
            </div>
        )
    }
    return(
        // <Navigate to="/" />
        navigate("/")
      )
    
}