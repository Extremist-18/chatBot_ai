// import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/typingAnim";

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

    return <Box width={"100%"} height={"100&"} flex={"flex"} mx={"auto"}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", mx:"auto", alighItems:"center",mt:3}}>
            <Box>
                <TypingAnim />
            </Box>
            <Box sx={{width:"60%",display:"flex",flexDirection:{md:"row",xs:"column", sm:"column"}, gap:5,my:10}}>
            <img src="/img3.png" alt="chatbot1" 
                style={{display:"flex", margin:"auto", width:isBelowMd?"80%":"60%",borderRadius:20, 
                    boxShadow:"-5px -5px 105px #64f3d3",
                    marginTop:20, marginBottom:20,
                }} />
                
                {/* <img src="/gpt1.png" className="image-inverted rotate" alt="openai" style={{width:"200px", margin:"auto"}} /> */}
            </Box>
            <Box sx={{display:"flex", width:"100%", mx:"auto"}}>
                <img src="/r2.png" alt="chatbot" 
                style={{display:"flex", margin:"auto", width:isBelowMd?"80%":"60%",borderRadius:20, 
                    boxShadow:"-5px -5px 105px #64f3d3",
                    marginTop:20, marginBottom:20,
                }} />
            </Box>
        </Box>
    </Box>
};

export default Home;
