const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);


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
