const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/user");
const { compare_password } = require("../utlis/helpers");

// Serialize User
passport.serializeUser((user, done) => {
  console.log("Serializeing user.....");
  console.log(user);
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser( async (id, done) => {
  console.log("Deserialize userrrr");
  console.log(id);

  try {
      const user_search_id = await User.findById(id);
      if (user_search_id) {
        console.log(user_search_id);
        done(null, user_search_id);
      } else throw new Error("User is not found local");  
  } catch (err) {
    console.log(err);
    done(err, null)
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);

      try {
        if (email && password) {
          const search_user = await User.findOne({ email });
          if (search_user) {
            const the_compare = compare_password(
              password,
              search_user.password
            );
            if (the_compare) {
              console.log("Authenticate Successfully");
              done(null, search_user);
            } else {
              console.log("Password error!");
              done(null, null);
            }
          } else throw new Error("this email not found");
        } else throw new Error("add the email and password!");
      } catch (err) {
        console.log(`Errorrrrrrrrrrrr: ${err}`);
        done(err, null);
      }
    }
  )
);
