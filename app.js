const mysql = require('mysql2');
const express = require('express');
const app = express();
const {getGenderCount} = require('./utilityfunctions');



const connection = mysql.createConnection ({
    host: 'localhost',
    database: 'tuwaze',
    user:'root',
    password: 'T@104rico',
    port: 3306,
})

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get('/dashboard', (req, res) => {
    connection.query('select * from users', (dbError, queryResult) => {
    if (dbError) {
        console.log("Database connection error: ", dbError.message);
    } else {
        console.log(getGenderCount(queryResult));
        res.render("dashboard.ejs", {allUsers: queryResult, maleFemaleCount: getGenderCount(queryResult)})
    }
    });
})

app.listen(3000)

