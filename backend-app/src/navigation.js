import  { AppBar, Toolbar }  from "@mui/material";
import { Link } from "react-router-dom";
export function Navbar(){
    return(
        <AppBar sx={{background:"#063970"}}>
            <Toolbar>
                <div style={{marginLeft:'auto',width:'35%'}}>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/landing">Dashboard</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcation">Transcation</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcationhistory">Transcation History</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/customerset">Customer</Link>                
                </div>
            </Toolbar>
        </AppBar>
    )
}