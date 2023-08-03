import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = new express();

config({
    path: "./data/config.env"
});


//Basiclly for middlewares

// to put json data into server via Postman
app.use(express.json()); 

app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    // sameSite: process.env === "DEVELOPMENT" ? "lax" : "none",
    // secure: process.env === "DEVELOPMENT" ? false : true ,
}));

app.use("/api/v1/users", userRouter); //custom URL
//..using routes
app.use("/api/v1/task", taskRouter);


app.get("/", (req, res) => {
    res.send("Server being heard.");
});

app.use(errorMiddleware);