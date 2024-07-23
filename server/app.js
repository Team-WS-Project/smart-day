const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT);

const usersRouter = require("./routes/users");
const schedulesRouter = require("./routes/schedules");
const todosRouter = require("./routes/todos");
const favoritesRouter = require("./routes/favorites");

app.use("/users", usersRouter);
app.use("/favorites", favoritesRouter);
app.use("/schedules", schedulesRouter);
app.use("/todos", todosRouter);
