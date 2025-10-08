import {logo} from"../utils/constants"
import{useState,useEffect} from "react";
import { Link } from "react-router-dom";

const Header=()=>{
    const[btnName,setBtnName]=useState("Login");
     console.log("header rendered")
     useEffect(()=>{
        console.log("useEffect rendered")
    },[btnName]);
    return (
    
    <div className="header">
    <div className="logo-container">
        <img className="logo" src={logo} alt="foodapp" />

    </div>
   <div className="title">   <h1>JUST ORDER</h1></div>
    <div className="nav link">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>Cart</li>
            <li><button className="login-btn"
            onClick={()=>{
                btnName==="Login"?setBtnName("Logout"):setBtnName("Login");
            }}
            >{btnName}</button></li>


        </ul>
    </div>
    </div>
)};
export default Header;