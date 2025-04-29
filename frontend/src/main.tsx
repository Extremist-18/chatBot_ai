// import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
// import {disableReactDevTools} from '@fvilers/disable-react-devtools'

// if(process.env.NODE_ENV ==='production')    disableReactDevTools()

// axios.defaults.baseURL = "http://localhost:5173/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://chatbot-ai-backend-oocv.onrender.com/api/v1";

const theme = createTheme({
  typography: {
    fontFamily: '"serif"', 
    allVariants: { color: "white" },
  },
});

const root = createRoot(document.getElementById('root')!); 

root.render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right'/>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);