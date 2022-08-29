import React, { useEffect, useState } from 'react';
import { Navigate,useLocation,useNavigate } from 'react-router-dom';
import './landing.css';
import { Navbar } from './navigation';
import Chart from 'react-apexcharts';
import {  Grid } from '@mui/material';
import Axios from 'axios';
import axios from 'axios';

export function Landing(props){
    const location=useLocation()
    const navigate= useNavigate()
    const [customerData,setcustomerData]=useState([])
    const [bankData,setbankData]=useState([])
    const [messageCode,setmessagecode]=useState([])

    useEffect(()=>{
        
        Axios.get("http://localhost:8080/transaction/top_customers/").then((res)=>{
            setcustomerData(res.data.top_customers)
        }).catch((err)=>{
            if(err.response.status==400)
            {
                alert(err.response.data.message)
            }
        })
        Axios.get("http://localhost:8080/transaction/top_banks/").then((res)=>{
            setbankData(res.data.top_banks)
        }).catch((err)=>{
            if(err.response.status==400)
            {
                alert(err.response.data.message)
            }
        })
        Axios.get("http://localhost:8080/transaction/top_message_codes/").then((res1)=>{
            setmessagecode(res1.data.top_message_codes)
            console.log(res1.data.top_message_codes)
           
        }).catch((err)=>{
            if(err.response.status==400)
            {
                alert(err.response.data.message)
            }
        })
    },[]);
    if((location.state!==null)?location.state.user:null){
        return(
            <div>
                <Navbar {...location.state}></Navbar><br/><br/><br/><br/>
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
                            data:customerData.slice(0,Math.min(customerData.length,5)).map((c)=>{
                                return (c.split(",")[2])
                            })
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Customer Name"
                                },
                                categories:customerData.slice(0,Math.min(customerData.length,5)).map((c)=>{
                                    return (c.split(",")[1])
                                })},
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
                            data:bankData.slice(0,Math.min(bankData.length,5)).map((b)=>{
                                return (b.split(",")[2])
                            })
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Bank Name"
                                },
                                categories:bankData.slice(0,Math.min(bankData.length,5)).map((b)=>{
                                    return (b.split(",")[1])
                                })},
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
                <Grid item xs={6}>
                        <center>
                        <h3><b>Message Codes</b></h3>
                        <Chart 
                        type="bar"
                        width={500}
                        height={250}
                        series={[{
                            name:"Amount Remitted",
                            data:messageCode.map((m)=>{
                                return (m.split(",")[2])
                            })
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Bank Name"
                                },
                                categories:messageCode.map((m)=>{
                                    return (m.split(",")[0])
                                })},
                            yaxis:{
                                title:{
                                    text:"Amount Recieved in {₹}"
                                }
                            }
                        }}
                        ></Chart></center>
                        </Grid>
                    {/* <Grid item xs={4}></Grid><br/>
                    <br/><center><h3><b>Message Codes</b></h3></center><br/>
                    <Grid item xs={4} style={{marginLeft:"400px"}} >  
                    <Chart 
                    type="pie"
                    width={500}
                    height={250}
                    series={messageCode.map((m)=>{
                        return (m.split(",")[2])
                    })}
                    options={{
                        labels:messageCode.map((m)=>{
                            return (m.split(",")[0])
                        })
                    }}
                    ></Chart>
                    </Grid> */}
                    <Grid xs={4}></Grid>
                </Grid>
            </div> 
        )
    }
    return(
        // <Navigate to="/" />
        navigate("/")
        
    )
}
