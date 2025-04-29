// import React from "react";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
// import NotFound from "./pages/NotFound"; 
import { useAuth } from "./context/AuthContext";
// import ProtectedRoute from "./context/ProtectedRoute.tsx";

function App() {
  console.log(useAuth()?.isLoggedIn);
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
        <Route path="/chat" element={<Chat />} /> 
        )}
        {/* <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>}  />
        <Route path="*" element={<NotFound />} />  */}
      </Routes> 
    </main>
  );
}
export default App;
