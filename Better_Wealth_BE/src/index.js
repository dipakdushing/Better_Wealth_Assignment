const express = require("express");

const app = express();

const cors= require("cors");

app.use(cors());

app.use(express.json());

const {register,login} = require('./controllers/auth.controller');

const courseController = require("./controllers/coursesController");

app.use("/course", courseController);
app.post("/register", register);
app.post("/login",login);

module.exports = app;
