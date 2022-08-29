import { Grid,TextField,InputLabel,Select,MenuItem,FormControl, Button} from "@mui/material";
import { Navbar } from "./navigation";
import React,{ useEffect, useState } from "react";
import Axios from "axios";
import { useLocation,useNavigate } from 'react-router-dom';
export function Transcation(){
  const location=useLocation()
  const navigate=useNavigate()
  const [customerId,setCustomerId]=useState("")
  const [customerName,setCustomerName]=useState("")
  const [customerBalance,setCustomerBalance]=useState(0)
  const [receiverAccountHolderNumber,setReceiverAccountHolderNumber]=useState("")
  const [receiverAccountHolderName,setReceiverAccountHolderName]=useState("")
  const [receiverBic,setReceiverBic]=useState("")
  const [receiverBankName,setReceiverBankName]=useState("")
  const [messageCode, setMessageCode] = useState("")
  const [transferType,setTransferType]=useState("")
  const [transferAmount,setTransferAmount]=useState(0)
  const [transferFees,setTransferFees]=useState(0)
  const [clearBalance,setClearBalance]=useState(0)



  useEffect(()=>{
    console.log(location.state)
    if(location.state!=null && !location.state.user.employee)
    {
      document.getElementById("cid").disabled=true
      setCustomerId(location.state.user.customer.customerId)
      setCustomerName(location.state.user.customer.accountHolderName)
      setCustomerBalance(location.state.user.customer.clearBalance)
    }
  },[])
    
  

  const handleCustomerId=(event)=>{
    setCustomerId(event.target.value)
  }
  const handleReceiverAccountHolderNumber=(event)=>{
    setReceiverAccountHolderNumber(event.target.value)
  }
  const handleReceiverAccountHolderName=(event)=>{
    setReceiverAccountHolderName(event.target.value)
    if(event.target.value.toLowerCase().indexOf("bank")!=-1)
    {
      setTransferType("BT")
    }
    else
    {
      setTransferType("CT")
    }
  }
  const handleReceiverBic=(event)=>{
    setReceiverBic(event.target.value)
  }
  const handleTransferType=(event)=>{
    setTransferType(event.target.value)
  }
  const handleMessageCode = (event) => {
    setMessageCode(event.target.value)
  }
  const handleTransferAmount=(event)=>{
    const val=Number(event.target.value)
    setTransferAmount(val)
    setTransferFees(0.25*val)
    setClearBalance(customerBalance-(val+(0.25*val)))
  }

  const getCustomerid=()=>{
    Axios.get("http://localhost:8080/transaction/get_sender_details/"+customerId)
    .then((res)=>{
      setCustomerName(res.data.accountholdername)
      setCustomerBalance(res.data.clearbalance)
    }).catch((err)=>{
      if(err.response.status==400)
      {
          alert(err.response.data.message)
      }
  })
  }

  const getReceiverBic=()=>{
    Axios.get("http://localhost:8080/transaction/get_bic/"+receiverBic)
    .then((res)=>{
      setReceiverBankName(res.data.bankName)
    }).catch((err)=>{
      if(err.response.status==400)
      {
          alert(err.response.data.message)
      }
  })
  }

  const setNull=()=>{
    setCustomerId("")
    setCustomerName("")
    setCustomerBalance(0)
    setReceiverAccountHolderNumber("")
    setReceiverAccountHolderName("")
    setReceiverBic("")
    setReceiverBankName("")
    setTransferType("")
    setMessageCode("")
    setTransferAmount(0)
    setTransferFees(0)
    setClearBalance(0)
  }

  const submitTransfer=()=>{
    const d={
      customerId:customerId,
      clearBalance:clearBalance,
      inrAmount:transferAmount,
      receiverBic:receiverBic,
      messageCode:messageCode,
      transferTypeCode:transferType,
      receiverAccountHolderName:receiverAccountHolderName,
      receiverAccountHolderNumber:receiverAccountHolderNumber
    }
   
    Axios.post("http://localhost:8080/transaction/intiate/",d)
    .then((res)=>{
      alert("Transaction Successful")
      setNull()
    }).catch((err)=>{
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
      <h1><center>Transaction</center></h1>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <center>
          <h4><b>Customer Details</b></h4>
          <TextField required label="Customer Id" value={customerId} onChange={handleCustomerId} onBlur={getCustomerid} id="cid" variant="outlined"/><br/><br/><br/>
          <TextField required label="Customer Balance" value={customerBalance} disabled id="customerBalance" variant="outlined"/><br/><br/><br/>
          </center>
        </Grid>
        <Grid item xs={4}>
          <br/><br/><br/>
          <center>
          <TextField required label="Customer Name" value={customerName} disabled id="customerName" variant="outlined"/><br/><br/><br/>
          </center>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <center>
          <h4><b>Reciever Details</b></h4>
          <TextField required label="Reciever Account Number" onChange={handleReceiverAccountHolderNumber} id="recieverId" variant="outlined"/><br/><br/><br/>
          <TextField required label="Reciever BIC" onChange={handleReceiverBic} onBlur={getReceiverBic}  id="recieverId" variant="outlined"/><br/><br/><br/>
          {/* ----------------Transfer Type -----------------*/}
          <FormControl sx={{ m: 0, minWidth: 205 }}>
            <InputLabel id="demo-simple-select-helper-label">Transfer Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={transferType}
              label="Transfer Type"
              onChange={handleTransferType} disabled>
              <MenuItem value={transferType} required>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"CT"}>CUSTOMER-CUSTOMER</MenuItem>
              <MenuItem value={"BT"}>CUSTOMER-BANK</MenuItem>
            </Select>
          </FormControl><br/><br/><br/>
          {/* Transfer Type */}
          <TextField required label="Amount to be Transferred" value={transferAmount} onChange={handleTransferAmount} id="bank_id" variant="outlined"/><br/><br/><br/>
         
          <TextField required label="Clear Balance"  id="bank_id" value={clearBalance} variant="outlined"/><br/><br/><br/>
          
          </center>
        </Grid>
        <Grid item xs={4}>
          <br/><br/><br/>
          <center>
          <TextField required label="Reciever Name" onChange={handleReceiverAccountHolderName} id="bIc" variant="outlined"/><br/><br/><br/>
          <TextField required disabled label="Reciever Bank Name" value={receiverBankName} id="bank_name" variant="outlined"/><br/><br/><br/>
          <FormControl sx={{ m: 0, minWidth: 205 }}>
            <InputLabel id="demo-simple-select-helper-label">Message Code</InputLabel>
            <Select required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={messageCode}
              label="Message Code"
              onChange={handleMessageCode}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"CHOQB"}>CHQB</MenuItem>
              <MenuItem value={"CORT"}>CORT</MenuItem>
              <MenuItem value={"HOLD"}>HOLD</MenuItem>
              <MenuItem value={"INTC"}>INTC</MenuItem>
              <MenuItem value={"PHOB"}>PHOB</MenuItem>
              <MenuItem value={"PHOI"}>PHOI</MenuItem>
              <MenuItem value={"PHON"}>PHON</MenuItem>
              <MenuItem value={"REPA"}>REPA</MenuItem>
              <MenuItem value={"SDVA"}>SDVA</MenuItem>
            </Select>
          </FormControl><br/><br/><br/>
          
          <TextField required label="Transfer Fees" value={transferFees} id="bank_id" variant="outlined"/><br/><br/><br/>
          </center>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <center><Button onClick={submitTransfer} variant="contained">Submit</Button></center><br/>
      </div>
  )
  }
  return(
    // <Navigate to="/" />
    navigate("/")
  )
    
}