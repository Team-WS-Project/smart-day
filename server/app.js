const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);

<<<<<<< HEAD
<<<<<<< HEAD
//todos 파일만 생성해서 위 두개 주석처리했었음
const userRouter = require('./routes/users');
const schedulesRouter = require('./routes/schedules');
<<<<<<< HEAD
const todolistRouter = require('./routes/todolist');

app.use("/users",userRouter);
app.use("/schedules",schedulesRouter);
app.use("/todolist",todolistRouter);
=======
const todoRouter = require('./routes/todos');

app.use("/users",userRouter);
app.use("/schedules",schedulesRouter);
app.use("/todos",todoRouter);
>>>>>>> a8e4540 (app.js)
=======
=======
>>>>>>> 6b44fb7c1798cf256c8ac013efd91a9e2ace0d0f
//복수형으로 통일 할지 정해야함
//const userRouter = require("./routes/users");
//const schedulesRouter = require("./routes/schedules");
const todoRouter = require("./routes/todos");

//app.use("/users", userRouter);
//app.use("/schedules", schedulesRouter);
app.use("/todos", todoRouter);
<<<<<<< HEAD
>>>>>>> 6b44fb7 (review first modify)
=======
>>>>>>> 6b44fb7c1798cf256c8ac013efd91a9e2ace0d0f
