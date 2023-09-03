const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/user");
const { hash_password, compare_password } = require("../utlis/helpers");

const route = Router();

route.post("/login", passport.authenticate("local"), (request, response) => {
  console.log("Logged in")
  response.send(200);
});

route.post("/register", async (request, response) => {
  const { email } = request.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    response.status(400).send("User already exists!");
  } else {
    const new_password = hash_password(request.body.password);
    console.log(new_password);
    const new_user = await User.create({ email, password: new_password });
    new_user.save();
    response.send(200);
  }
});

route.get("/discord", passport.authenticate("discord"), (request, response) => {
  response.send(200);
});

route.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    response.send(200);
  }
);

module.exports = route;