import axios from "axios";

axios.defaults.baseURL = "https://chatbot-ai-backend-oocv.onrender.com/api/v1";
axios.defaults.withCredentials = true;

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", { email, password }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Network error");
  }
};

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await axios.post("/user/signup", { name, email, password }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "SignUp failed");
    }
    throw new Error("Network error");
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get("/user/auth-status", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message }, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
  if (res.status !== 200) {
    throw new Error("Unable to send Chat");
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats",{
    withCredentials: true
  });
  if (res.status !== 200) {
    throw new Error("Unable to get Chat");
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete",{
    withCredentials: true
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete Chat");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout",{
    withCredentials: true
  });
  if (res.status !== 200) {
    throw new Error("Unable to Logout");
  }
  return res.data;
};
