import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello form express endpoint" });
});

app.listen(7000, () => {
  console.log("Server running on localhost:7000");
});
