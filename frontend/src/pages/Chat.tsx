// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import {Button, Box, Avatar, Typography, IconButton } from '@mui/material';
// import { useAuth } from "../context/AuthContext";
// import {red} from '@mui/material/colors';
// // import {ChatItem} from "../components/chat/chatItem";
// import {IoMdSend} from "react-icons/io";
// import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicatio";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom"

// type Message =  {
//     role: "user"|"assistant";
//     content: string; 
// };

// const Chat = () => {
//     const navigate =useNavigate();

//     const inputRef = useRef<HTMLInputElement |null>(null);
//     const auth = useAuth();
//     const [chatMessages,setChatMessages ] = useState<Message[]>([]);
//     const handleSubmit = async() =>{
//         // console.log(inputRef.current?.value);
//         const content = inputRef.current?.value as string;
//         if(inputRef && inputRef.current){
//             inputRef.current.value = "";
//         }
//         const newMessage:Message = {role:"user", content};
//         setChatMessages((prev) => [...prev, newMessage]);

//         const chatData = await sendChatRequest(content);
//         setChatMessages([...chatData.chats]);
//     };

// const handleDeleteChats = async() =>{
//     try{
//         toast.loading("Deleting Chats",{id:"deletechats"});
//         await deleteUserChats();
//         setChatMessages([]);
//         toast.success("Chats Deleted Successfully",{id:"deletechats"})
//     } catch(error){
//         console.log(error);
//         toast.error("Deleting Chats failed",{id:"deletechats"});
//     }
// }
    
//     useLayoutEffect(()=>{
//         if(auth?.isLoggedIn && auth.user){
//             toast.loading("Loading Chats",{id:"loadchats"});
//             getUserChats().then((data)=> {
//                 setChatMessages([...data.chats]);
//                 toast.success("Chats loaded Successfully",{id:"loadchats"});
//             }).catch(err => {
//                 console.log(err);
//                 toast.error("Loading Failed",{id:"loadchats"})

//             });
//         }
//     },[auth]);
//     useEffect(() => { 
//         if (auth?.user) {
//             navigate("/chat");
//         }
//     }, [auth, navigate]);
//     return (<Box sx={{display:"flex", flex:1,width:'100%',height:'100%',mt:3,gap:3}}>
//         <Box sx={{display:{md:"flex", xs:"none",sm:"none"},}}>
//             <Box sx= {{
//                 display:"flex",
//                 width:"100%", 
//                 height:"60vh",
//                 bgcolor:"rgb(17,29,39)",
//                 borderRadius:5,
//                 flexDirection:'column',
//                 mx:3,
//                 }}>
//                     <Avatar sx={{mx:"auto",my:2,bgcolor:"white",color:"black", fontWeight:700}}>
//                         {auth?.user?.name[0]}
//                         {auth?.user?.name.split("")[1][0]}
//                     </Avatar>
//                     <Typography sx={{mx:"auto", fontFamily:"work sans"}}>
//                         You are talking to a ChatBot!!
//                     </Typography>
//                     <Typography sx={{mx:"auto", fontFamily:"work sans", my:4,p:3}}>
//                         You can ask anything. Avoid sharing your Personal Information!!
//                     </Typography>
//                     <Button 
//                     onClick={handleDeleteChats}
//                     sx={{    
//                         width:"200px",
//                         my:"auto",
//                         color:"white",
//                         fontWeight:"700",
//                         borderRaidus:3,
//                         mx:"auto",
//                         bgcolor:red[300],
//                         ":hover":{
//                             bgcolor: red.A400,
//                         },
//                     }}> Clear Conversation</Button>
//             </Box>
//         </Box>
//         <Box sx={{display:"flex",flex:{md:0.8,xs:1,sm:1}, flexDirection:"column"}}>
//             <Typography sx={{textAlign:"center", fontSize:"40px", color:"white",mb:2}}>
//                     GPT 3.5-Turbo
//             </Typography>
//             <Box sx={{width:"100%", height:"60vh", borderRadius:3, mx:'auto',display:"flex",flexDirection:"column", overflow:"scroll",overflowX:"hidden",overflowY:"auto", scrollBehavior:"smooth"}}>

//             {chatMessages.map((chat,index)=> (
//                 // @ts-ignore
//                 <ChatItem content={chat.content} role={chat.role} key={index}></ChatItem>
//                 ))}
//             </Box>
//             <div style={{width:"100%",borderRadius:8, backgroundColor:"rgb(17,27,39)", display:"flex", margin:"auto",}}> {" "}
//                 <input ref = {inputRef} 
//                 type="text" style={{width:"100%", backgroundColor:"transparent", padding:"20px",border:"none", outline:"none", color:"white",fontSize:"20px"}} />
//                 <IconButton onClick={handleSubmit} sx={{ml:"auto", color:"white"}}>
//                     <IoMdSend/>
//                 </IconButton>
//             </div>
//         </Box>
//     </Box>
// )};

// export default Chat;

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Box, Avatar, Typography, IconButton } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import { red } from '@mui/material/colors';
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicatio";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  return (
    <Box sx={{
      display: "flex",
      padding: 2,
      bgcolor: role === "assistant" ? "#004d56" : "#004156",
      my: 1,
      mx: 2,
      borderRadius: 2
    }}>
      <Typography sx={{ color: "white" }}>{content}</Typography>
    </Box>
  );
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle authentication and load chats
  useLayoutEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadChats = () => {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chats loaded Successfully", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    };

    loadChats();
  }, [auth, navigate]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content.trim()) return;

    if (inputRef?.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit();
  //   }
  // };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats failed", { id: "deletechats" });
    }
  };

  // if (!auth?.isLoggedIn) {
  //   return null;
  // }
  if (!auth?.isLoggedIn) {
    navigate("/login"); // or return null
  }

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: '100%',
      height: '100%',
      mt: 3,
      gap: 3,
      color: "white"
    }}>
      {/* Sidebar */}
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2 }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: 'column',
          mx: 3,
        }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
            {auth.user?.name[0]}
            {auth.user?.name.split(" ")[1]?.[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask anything. Avoid sharing personal information!
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "180px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Area */}
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column" }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          YourGPT 0.1 
        </Typography>
        
        {/* Messages Container */}
        <Box
          ref={chatContainerRef}
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: 'auto',
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        {/* Input Area */}
        <Box sx={{
          width: "100%",
          borderRadius: 2,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          alignItems: "center",
          p: 1,
          mt: 2
        }}>
          <input
            ref={inputRef}
            type="text"
            style={{
              flex: 1,
              backgroundColor: "transparent",
              padding: "12px 16px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "16px"
            }}
            // onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <IconButton 
            onClick={handleSubmit} 
            sx={{ 
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            <IoMdSend size={24} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;