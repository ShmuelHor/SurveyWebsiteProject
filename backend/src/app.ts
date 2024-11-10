import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db"
import router from './routes/route';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDb();
app.use(express.json());
app.use(cors());
app.use("/api",router)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
