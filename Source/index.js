const express = require("express");
require("dotenv").config();
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const mongo_store = require("connect-mongo");
const passport = require("passport");

// Routes
const pharmacy_route = require("./Routes/pharmacy");
const markets_route = require("./Routes/Markets");
const auth_route = require("./Routes/auth");

const app = express();
const port = 8080;

require("./database/index");
require('./strategies/local.js');
require("./strategies/discord");

// Middlleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookie_parser());
app.use(
  session({
    secret: "ASDQWEQWSDGHFGJFGHFGJH",
    resave: false,
    saveUninitialized: false,
    store: mongo_store.create({
      mongoUrl: process.env.MONGO_DB,
    }),
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/pharmacy", pharmacy_route);
app.use("/api/v1/markets", markets_route);
app.use("/api/v1/auth", auth_route); // done

// start app
app.listen(port, () => {
  console.log(`the server is running on port: ${port}`);
});
