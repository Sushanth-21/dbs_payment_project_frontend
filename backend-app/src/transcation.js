import { Grid,TextField,InputLabel,Select,MenuItem,FormControl, Button} from "@mui/material";
import { Navbar } from "./navigation";
import React from "react";
import Axios from "axios";
export function Transcation(){
  const [message, setMessage] = React.useState('');
  const [transfer,setTransfer]=React.useState('');
  const url='https://reqres.in/api/login'
  const submitTransfer=()=>{
    Axios.post(url,{
      cid:document.getElementById("cid").value,
      customerName:document.getElementById("customerName").value

    })
  }
  const handleTransfer=(e)=>{
    setTransfer(e.target.value);
  }

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
    return (
        <div>
        <Navbar/><br/><br/><br/><br/>
        <h1><center>Transcation</center></h1>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <center>
            <h4><b>Customer Details</b></h4>
            <TextField label="Customer Id" id="cid" variant="outlined"/><br/><br/><br/>
            <TextField label="Customer Balance" disabled id="customerBalance" variant="outlined"/><br/><br/><br/>
            </center>
          </Grid>
          <Grid item xs={4}>
            <br/><br/><br/>
            <center>
            <TextField label="Customer Name" disabled id="customerName" variant="outlined"/><br/><br/><br/>
            </center>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <center>
            <h4><b>Reciever Details</b></h4>
            <TextField label="Reciever Id"  id="recieverId" variant="outlined"/><br/><br/><br/>
            <TextField label="BIC Code"  id="bIc" variant="outlined"/><br/><br/><br/>
            <FormControl sx={{ m: 0, minWidth: 205 }}>
              <InputLabel id="demo-simple-select-helper-label">Message Code</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={message}
                label="Message Code"
                onChange={handleMessage}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Message type-1</MenuItem>
                <MenuItem value={20}>Message type 2</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl><br/><br/><br/>
            <TextField label="Transfer Fees"  id="bank_id" variant="outlined"/><br/><br/><br/>
            
            </center>
          </Grid>
          <Grid item xs={4}>
            <br/><br/><br/>
            <center>
            <TextField label="Reciever Bank Name"  id="bank_name" variant="outlined"/><br/><br/><br/>
            {/* ----------------Transfer Type -----------------*/}
            <FormControl sx={{ m: 0, minWidth: 205 }}>
              <InputLabel id="demo-simple-select-helper-label">Transfer Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={transfer}
                label="Transfer Type"
                onChange={handleTransfer}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Transfer type-1</MenuItem>
                <MenuItem value={20}>Transfer type 2</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl><br/><br/><br/>
            {/* Transfer Type */}
            <TextField label="Amount to be Transferred"  id="bank_id" variant="outlined"/><br/><br/><br/>
            <TextField label="Clear Balance"  id="bank_id" variant="outlined"/><br/><br/><br/>
            </center>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <center><Button onClick={submitTransfer} variant="contained">Submit</Button></center><br/>
        </div>
    )
}