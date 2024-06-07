import express from "express";
import "dotenv/config";
import userRouter from "./Router/user.js";
import mongoose from "mongoose";
import cors from "cors"

let server = express();
let port = process.env.PORT || 3030;

// middlewares 
server.use(express.json()); // This will help us to read Body of request
server.use("/", userRouter);
server.use(cors())

// DB connection 
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected ");
}

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
