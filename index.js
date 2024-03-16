import express from "express";
import cors from "cors";
import { connectToDB } from "./db/db.js";
import userRouter from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const MONGO_STRING = process.env.MONGO_STRING || "e";

const app = express();

connectToDB(MONGO_STRING);
app.use(express.json());
app.use(cors({ origin: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.options("*", cors("*"));
app.use(cors("*"));

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send({ syccess: true });
});

app.listen(PORT, () => {
  console.log(`server listeninig on port ${PORT}`);
});
