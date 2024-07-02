const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT); // 터미널에 node app.js로 실행

const userRouter = require("./routes/users");
// const schedulesRouter = require('./routes/schedules');
// const todolistRouter = require('./routes/todolist');

app.use("/users", userRouter);
// app.use("/schedules",schedulesRouter);
// app.use("/todolist",todolistRouter);
