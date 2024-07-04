const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.listen(process.env.PORT);

const usersRouter = require("./routes/users");
const schedulesRouter = require("./routes/schedules");
const todosRouter = require("./routes/todos");

app.use("/users", usersRouter);
app.use("/schedules", schedulesRouter);
app.use("/todos", todosRouter);
