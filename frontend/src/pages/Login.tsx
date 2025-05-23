import React from "react";
import { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
// import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

const Login =()=>{
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        // console.log(email,password);
        try {
            toast.loading("Signing Up", { id: "login" });
            await auth?.login(email, password);
            toast.success("Signed Up Successfully", { id: "login", duration: 1000 });
        } catch (error) {
            console.log(error);
            toast.error("Sign In failed",{id:"login"});
        }
    };

// useEffect(()=>{ 
//     if(auth?.user){
//         navigate("/chat");
//     }
// },[auth]);

// useEffect(() => {
//     if (!auth.loading && auth.user) {
//       navigate("/chat");
//     }
//   }, [auth.loading, auth.user]);

  useEffect(() => {
    if (!auth.loading && auth.user) {
      if (location.pathname === "/login") {
        navigate("/chat");
      }
    }
  }, [auth.loading, auth.user, location]);

    return (<Box width={"100%"} height={"100%"} display="flex" flex={1}>
        <Box padding={2} mt={6} display={{md:"flex",sm:"none",xs:"none"}}>
            <img src="robot1.png" alt="Robot" style={{width:"400px"}} />
        </Box>
        <Box display={"flex"} flex={{xs:1,md:0.5}} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
            <form onSubmit={handleSubmit} style={{margin:"auto", padding:"30px", boxShadow:"10px 10px 20px #000", borderRadius:"10px", border:"none"}}>
                <Box sx={{display:'flex', flexDirection:"column",justifyContent:"center"}}>
                    <Typography variant="h4" textAlign={"center"} padding={2} fontWeight={600}>
                        Login
                    </Typography>
                    <CustomizedInput type="email" name="email" label="Email"/>
                    <CustomizedInput type="password" name="password" label="Password"/>
                    <Button type="submit" sx={{px:2, py:1, mt:2,width:"40",borderRadius:2, 
                        bgcolor:"#00fffc",
                        ":hover":{
                            bgcolor:"white",
                            color:"black",
                        },
                        }}
                        endIcon ={<IoIosLogIn />}
                        >Login</Button>
                </Box>
            </form>
        </Box> 
    </Box>
    );
};

export default Login;