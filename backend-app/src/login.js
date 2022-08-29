import logo from "./static/login.jpg"
import Grid from "@mui/material/Grid"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Axios from 'axios';
import { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate} from "react-router-dom";

// export const UserContext = React.createContext()
export function Login(){
    const url='http://localhost:8080/auth/login/'
    const [user,setUser]=useState(null)
    const navigate= useNavigate()
    const submitLogin=()=>{
        //console.log(document.getElementById("username"))
        Axios.post(url,{
            username:document.getElementById("username").value,
            password:document.getElementById("password").value
        }).then(result=>{
            console.log(result.data)
            setUser(user)
            navigate("/landing",{state:{user:{user}}})
        })
    }
    return(
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img src={logo} alt="image1" height={"100%"}/>
            </Grid>
            <Grid item xs={4}>
                <form>
                <center><br/><br/>
                <h1 color="red" ><b>Login</b></h1>
                <br/><br/>
                <TextField  id="username" type ="text" label="User Name" variant="outlined" />
                <br/><br/>
                <TextField  id="password" type="password" label="Password" variant="outlined"/>
                <br/>
                <br/>
                <Button onClick={submitLogin} variant="contained" color="success" startIcon={<LockIcon />}>Login</Button>
                </center>
                </form>
            </Grid>
        </Grid>
    )
}