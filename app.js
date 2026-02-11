// 1. import and configure modules/packages 
const mysql = require('mysql2');
const express = require('express');
const app = express();
const {getGenderCount} = require('./utilityfunctions');
const session = require("express-session");
const bcrypt = require("bcrypt");



// 2. Registering middleware functions

app.use(session ({
  secret: "encryptionKey",
  resave: false,
  saveUninitialized: true,
  options: {secure: true, expires: new Date(Date.now() + 60 * 60 * 1000)}, // this sums up to 1hr
}))


let isLoggedIn;
let loggedInUser;
const privateRoutes = ["/dashboard","/profile"];


app.use((req, res, next) => {
  console.log("Middleware function executed!!");
  if(req.session.user){
    isLoggedIn = true;
    loggedInUser = req.session.user;
  }else{
    isLoggedIn = false;
  }
  if(isLoggedIn || !privateRoutes.includes(req.path)) {
    next();
  }else {
    res.status(401).send("Unauthorized!!")
  }
})

app.use(express.urlencoded({extended: true}))

//3. Register the routes i.e routes/pages/endpoint handlers
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


// bcrypt - hash/encrypt passwords
app.post("/signup", (req, res) => {

  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, (hashError, hashedPassword) => {

    if (hashError) {
      return res.status(500).send("Error hashing password");
    }

    const insertStatement = `
      INSERT INTO users(full_name, phone_number, email, gender, password_hash, role, ward, is_anonymous_allowed)
      VALUES('${req.body.fullname}', 
             '${req.body.phone}', 
             '${req.body.email}', 
             '${req.body.gender}', 
             '${hashedPassword}', 
             'citizen', 
             '${req.body.location}', 
             TRUE);
    `;

    connection.query(insertStatement, (insertError) => {
      if (insertError) {
        res.status(500).send("Server Error!! " + insertError.message);
      } else {
        res.redirect("/login");
      }
    });

  });

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

app.post("/auth", (req, res) => {

  connection.query(`SELECT * FROM users WHERE email = '${req.body.email}';`, 
  (dbError, queryResult) => {

    if (dbError) {
      console.log("DB error occured: " + dbError.message);
      return res.status(500).send("Server Error!!");
    }

    if (queryResult.length === 0) {
      return res.send("Invalid email or password!!");
    }

    const storedHash = queryResult[0].password_hash;

    bcrypt.compare(req.body.password, storedHash, (compareError, result) => {

      if (compareError) {
        return res.status(500).send("Error comparing passwords");
      }

      if (result) {
        // Password matches
        req.session.user = queryResult[0];
        res.redirect("/dashboard");
      } else {
        res.send("Invalid email or password!!");
      }

    });

  });

});


// 404 handler
app.use(  (req, res) => {
  res.status(404).render("404.ejs");
});

app.listen(3000)

