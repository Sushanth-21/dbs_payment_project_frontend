import  { AppBar, Toolbar }  from "@mui/material";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
export function Navbar(props){
    const navigate=useNavigate()
    const logout=(e)=>{
        e.preventDefault()
        console.log(props.user)
        Axios.post("http://localhost:8080/auth/logout/"+((typeof props.user.userId)==='undefined'?props.user.employeeId:props.user.userId))
        .then((res)=>{
            console.log("logged out")
            navigate("/")
        })
    }
    return(
        <AppBar sx={{background:"#063970"}}>
            <Toolbar>
                <div style={{marginLeft:'auto',width:'40%'}}>
                {props.user.employee?
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/landing" state={props}>Dashboard</Link>:null}
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcation" state={props}>Transaction</Link>
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/transcationhistory" state={props}>Transcation History</Link>
                {props.user.employee?
                <Link style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/customerset" state={props}>Customer</Link>:null}                
                <Link onClick={logout} style={{color:'white',textDecoration:'none',marginLeft:'15px'}} to="/">Logout</Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}