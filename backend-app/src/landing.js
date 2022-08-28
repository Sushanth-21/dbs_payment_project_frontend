import React, { useEffect, useState } from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import './landing.css';
import { Navbar } from './navigation';
import Chart from 'react-apexcharts';
import {  Grid } from '@mui/material';
import Axios from 'axios';

export function Landing(){
    const location=useLocation()
    const [customerData,setcustomerData]=useState([])
    const [bankData,setBankdata]=useState([])
    const [messageCode,setMessagecode]=useState([])
    const mName=[]
    const mCount=[]
    const bName=[];
    const bAmount=[];
    const cName=[];
    const cAmount=[];
    const url="http://localhost:8080/transaction/top_customers/";
    const url1="http://localhost:8080/transaction/top_banks/";
    const url2="http://localhost:8080/transaction/top_message_codes/";
    useEffect(()=>{
        Axios.get(url1).then((res)=>{
            setBankdata(res.data.top_banks)
            console.log(res.data.top_banks)
        })
        Axios.get(url).then((res)=>{
            setcustomerData(res.data.top_customers)
        })
        
        Axios.get(url2).then((res1)=>{
            setMessagecode(res1.data.top_message_codes)
           
        })
    },[]);
    for (let i=0;i<Math.min(customerData.length,5);i++){
        let customer=customerData[i].split(",")
        cName.push(customer[1])
        cAmount.push(parseInt(customer[2]))
    }
    // const [bankData,setBankData]=useState([])
    // const bName=[];
    // const bAmount=[];
    // const url1="http://localhost:8080/transaction/top_banks/";
    // useEffect(()=>{
    //     Axios.get(url1).then((res)=>{
    //         setBankData(res.data.top_banks)
    //         console.log(bankData)
    //     })
    // },[])
    for (let i=0;i<Math.min(bankData.length,5).length;i++){
        let bank=bankData[i].split(",")
        bName.push(bank[1])
        bAmount.push(parseInt(bank[2]))
    }
    // const [messageCode,setMessagecode]=useState([])
    // const mName=[]
    // const mCount=[]
    // const url2="https://api.npoint.io/07286fe54fc822ff7f4e";
    // useEffect(()=>{
    //     Axios.get(url2).then((res1)=>{
    //         setMessagecode(res1.data)
           
    //     });
    // },[])
    for(let k=0;k<messageCode.length;k++){
        let code=messageCode[k].split(",")
        mName.push(code[0]);
        mCount.push(code[2])
    }
    
    
    if(location.state!==null?location.state.user:null){
        return(
            <div>
                <Navbar></Navbar><br/><br/><br/><br/>
                <Grid container>
                    <Grid item xs={6}>
                        <center>
                            <h3><b>Top Five Customers</b></h3>
                        <Chart 
                        type="bar"
                        width={500}
                        height={250}
                        series={[{
                            name:"Amount Transferred",
                            data:cAmount
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Customer Name"
                                },
                                categories:cName},
                            yaxis:{
                                title:{
                                    text:"Amount Transferred in {₹}"
                                }
                            }
                        }}
                        ></Chart></center>
                        </Grid>
                    <Grid item xs={6}>
                        <center>
                        <h3><b>Top Five Banks</b></h3>
                        <Chart 
                        type="bar"
                        width={500}
                        height={250}
                        series={[{
                            name:"Amount Remitted",
                            data:bAmount
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Bank Name"
                                },
                                categories:bName},
                            yaxis:{
                                title:{
                                    text:"Amount Recieved in {₹}"
                                }
                            }
                        }}
                        ></Chart></center>
                        </Grid>
                </Grid>
                <Grid contained spacing={2}>
                    <Grid item xs={4}></Grid><br/>
                    <br/><center><h3><b>Message Codes</b></h3></center><br/>
                    <Grid item xs={4} style={{marginLeft:"400px"}} >  
                    <Chart 
                    type="pie"
                    width={500}
                    height={250}
                    series={mCount}
                    options={{
                        labels:mName
                    }}
                    ></Chart>
                    </Grid>
                    <Grid xs={4}></Grid>
                </Grid>
            </div> 
        )
    }
    return(
        <Navigate to="/"/>
        
    )
}
