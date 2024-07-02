const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

//todos 파일만 생성해서 위 두개 주석처리했었음
const userRouter = require('./routes/users');
const schedulesRouter = require('./routes/schedules');
const todoRouter = require('./routes/todos');

app.use("/users",userRouter);
app.use("/schedules",schedulesRouter);
app.use("/todos",todoRouter);