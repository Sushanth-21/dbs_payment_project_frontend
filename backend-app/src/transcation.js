import { Grid,TextField,InputLabel,Select,MenuItem,FormControl, Button} from "@mui/material";
import { Navbar } from "./navigation";
import React,{ useEffect, useState } from "react";
import Axios from "axios";
export function Transcation(){
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

  const handleCustomerId=(event)=>{
    setCustomerId(event.target.value)
  }
  const handleReceiverAccountHolderNumber=(event)=>{
    setReceiverAccountHolderNumber(event.target.value)
  }
  const handleReceiverAccountHolderName=(event)=>{
    setReceiverAccountHolderName(event.target.value)
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
    })
  }

  const getReceiverBic=()=>{
    Axios.get("http://localhost:8080/transaction/get_bic/"+receiverBic)
    .then((res)=>{
      setReceiverBankName(res.data.bankName)
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
    console.log(d)
    Axios.post("http://localhost:8080/transaction/intiate/",d)
    .then((res)=>{
      if(res.status==200)
      {
        alert("res.data.message")
      }
      alert("Transaction Successful")
      console.log(res.data)
    })
  }

  // ----------------getting the customer details----------------------
  // const url4="https://api.npoint.io/05d8575fca2d27d62cd4"
  // const [customer,setCustomer]=React.useState('');
  // const getCustomerid=(e1)=>{
  //   setCustomer(e1.target.value)
  // };
  // useEffect(()=>{
  //   Axios.get("sdfsd")
  //   .then((res)=>{

  //   })
  // })
  // const url1="https://api.npoint.io/05d8575fca2d27d62cd4"
  
  // useEffect(()=>{
  //   Axios.get(url1).then((result)=>{
  //     // setCustomerdetails(result.data)
  //   });
  // },[])
  // let customerName=''
  // let customerBalance=''
  // if(customer.length===14){
  // for(let i=0;i<customerdetails.length;i++){
  //   if(customerdetails[i].customerid===Number(customer)){
  //     customerName=customerdetails[i].customername
  //     customerBalance=customerdetails[i].balance
  //     }
  //   }
  // }
  // ---------------end of getting customer details----------------------------


  //--------------------- getting bank details---------------------------------
  // const [bankid,setBankid]=useState('')
  // const [bankDetails,setBankdetails]=useState([])
  // const [bankName,setBankname]=useState('')
  // const getBankid=(e4)=>{
  //   setBankid(e4.target.value)
  // }
  // const bankurl="https://api.npoint.io/d068651edeb61316bd61"
  // useEffect(()=>{
  //   Axios.get(bankurl).then((bankresult)=>{
  //     setBankdetails(bankresult.data)
  //   })
  // },[])
  // if(bankid.length===11){
  //   for(let i=0;i<bankDetails.length;i++){
  //     if(bankDetails[i].bankid===Number(bankid)){
  //       console.log(bankDetails[i].bankname)
  //     }
  //   }
  // }

  
  // const url='https://api.npoint.io/05d8575fca2d27d62cd4'
  // const submitTransfer=()=>{
  //   Axios.post(url,{
  //     customerId:document.getElementById("cid").value

  //   })
  // }
    return (
        <div>
        <Navbar/><br/><br/><br/><br/>
        <h1><center>Transcation</center></h1>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <center>
            <h4><b>Customer Details</b></h4>
            <TextField required label="Customer Id" onChange={handleCustomerId} onBlur={getCustomerid} id="cid" variant="outlined"/><br/><br/><br/>
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
                onChange={handleTransferType}>
                <MenuItem value="" required>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"CT"}>CUSTOMER-CUSTOMER</MenuItem>
                <MenuItem value={"BT"}>CUSTOMER-BANK</MenuItem>
              </Select>
            </FormControl><br/><br/><br/>
            {/* Transfer Type */}
            <TextField required label="Amount to be Transferred" onChange={handleTransferAmount} id="bank_id" variant="outlined"/><br/><br/><br/>
           
            <TextField required label="Clear Balance"  id="bank_id" value={clearBalance} variant="outlined"/><br/><br/><br/>
            
            </center>
          </Grid>
          <Grid item xs={4}>
            <br/><br/><br/>
            <center>
            <TextField required label="Reciever Name" onChange={handleReceiverAccountHolderName} id="bIc" variant="outlined"/><br/><br/><br/>
            <TextField required label="Reciever Bank Name" value={receiverBankName} id="bank_name" variant="outlined"/><br/><br/><br/>
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