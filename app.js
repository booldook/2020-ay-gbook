require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const indexRouter = require('./routes/index');
const gbookRouter = require('./routes/gbook');
const userRouter = require('./routes/user');

app.listen(process.env.PORT, () => {
	console.log(`http://127.0.0.1:${process.env.PORT}`);
});

// View
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.locals.pretty = true;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Router
app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/", indexRouter);
app.use("/gbook", gbookRouter);
app.use("/user", userRouter);

// 404 Error
app.use((req, res, next) => {
	res.send('<h1>Not Found - <small>404 Error</small></h1>');
})