const express = require("express");

const session = require("express-session");

const cors = require("cors");

const { db } = require("./connection");

const { createStudentModel } = require("./models/studentModel");

const { createUserTable } = require("./models/user");

const { logReqRes } = require("./middlewares/student");

const { errorHandler } = require("./middlewares/auth")

const studentRoutes = require("./routes/routes");

const userRoutes = require("./routes/user");

const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT;

const FRONTEND_URL = process.env.FRONTEND_URL

require("dotenv").config();

// MIDDLEWARES

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(logReqRes("log.txt"));


// SESSION MIDDLEWARE

app.use(
    session({
        secret: "student_secret_key",
        resave: false,
        saveUninitialized: false
    })
);

// CREATE TABLES

createStudentModel();

createUserTable();


// ROUTES

app.use("/students", studentRoutes);

app.use("/", userRoutes);


// SERVER

app.listen(process.env.PORT, () => {
    console.log(`Server Started at PORT:${process.env.PORT}`);
});