import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();
const PORT = 3000;
// GET // PUT // POST // DELETE
// to read data
// app.use(cors({origin:"https://chatbot-ai-c526.onrender.com", credentials:true,allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
//   methods: ["GET", "POST", "PUT", "DELETE"]}));
app.use(cors({
    origin: "https://chatbot-ai-c526.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
app.get("/", (req, res) => {
    res.send("Server is running! 🚀");
});
export default app;
