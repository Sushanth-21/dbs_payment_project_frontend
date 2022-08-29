import  { AppBar, Toolbar }  from "@mui/material";
import { Link } from "react-router-dom";
export function Navbar(props){
    return(
        <AppBar sx={{background:"#063970"}}>
            <Toolbar>
                <div style={{marginLeft:'auto',width:'35%'}}>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/landing" state={{user:props}}>Dashboard</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcation" state={{user:props}}>Transaction</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcationhistory" state={{user:props}}>Transcation History</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/customerset" state={{user:props}}>Customer</Link>                
                </div>
            </Toolbar>
        </AppBar>
    )
}