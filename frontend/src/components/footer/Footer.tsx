// import React from 'react'
import {Link} from 'react-router-dom';

const Footer =() =>{
    return (
        <footer>
            <div
            style={{
                width:"100%",
                padding:20,
                minHeight:"20vh",
                maxHeight:"30vh",
                marginTop:50,
            }}
            >
                <p style={{ fontSize:"30px", textAlign:"center"}}>
                    Developed by Lalit Agrawal Aka  
                    <span> <Link style={{color:"white"}} 
                    className="nav-link" to={"https://extremist-18.github.io/Portfolio/"}>Extremist </Link>
                        </span> 
                </p>
            </div>
        </footer>
    )
};

export default Footer;