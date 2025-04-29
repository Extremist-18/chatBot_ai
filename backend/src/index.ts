import app from "./app.js"
import express from 'express'
import { connectToDatabase } from "./db/connection.js";
// to read data
// const app = express();

const PORT = process.env.PORT || 3000;
// const PORT = "https://chatbot-ai-c526.onrender.com/"; 
app.use(express.json())

connectToDatabase().then(() => {
  app.listen(PORT, () => {
      // console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🚀 Server running on port ${PORT}`);
    }).on('error', (err) => {
      console.error('Server failed:', err);
  });
}).catch((err)=>console.log(err));

