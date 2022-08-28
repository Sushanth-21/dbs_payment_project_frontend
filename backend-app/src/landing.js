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
    const cName=[];
    const cAmount=[];
    const url="https://api.npoint.io/27f3301bf89e6dfc5a62";
    useEffect(()=>{
        Axios.get(url).then((res)=>{
            setcustomerData(res.data)
        });
    },[]);
    for (let i=0;i<customerData.length;i++){
        cName.push(customerData[i].customername);
        cAmount.push(parseInt(customerData[i].transcationvalue));
    }
    const [messageCode,setMessagecode]=useState([])
    const mName=[]
    const mCount=[]
    const url1="https://api.npoint.io/07286fe54fc822ff7f4e";
    useEffect(()=>{
        Axios.get(url1).then((res1)=>{
            setMessagecode(res1.data)
            console.log(res1.data);
        });
    },[])
    for(let k=0;k<messageCode.length;k++){
        mName.push(messageCode[k].messageName);
        mCount.push(messageCode[k].messageCount)
    }
    console.log(messageCode);
    //console.log(location.state.hasOwnProperty("user"))
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
                            data:cAmount
                        }]}
                        options={{
                            xaxis:{
                                title:{
                                    text:"Bank Name"
                                },
                                categories:cName},
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
