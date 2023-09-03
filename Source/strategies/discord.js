const passport = require("passport");
const { Strategy } = require("passport-discord");
const discord_model = require("../database/schemas/discordUser.js");

// Serialize User
passport.serializeUser((user, done) => {
  console.log("Serializeing user.....");
  console.log(user);
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  console.log("Deserialize userrrr");
  console.log(id);

  try {
    const user_search_id = await discord_model.findById(id);
    if (user_search_id) {
      console.log(user_search_id);
      done(null, user_search_id);
    } else throw new Error("User is not found discord");
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken);
      console.log(profile);
      try {
        const find_database = await discord_model.findOne({
          discordID: profile.id,
        });
        if (find_database) {
          console.log(`found user: ${find_database}`);
          return done(null, find_database);
        } else {
          const new_user = await discord_model.create({
            discordID: profile.id,
          });
          console.log(`create a new user: ${new_user}`);
          return done(null, new_user);
        }
      } catch (err) {
        console.log(`Errorrrrrrrrrrrr: ${err}`);
        return done(err, null);
      }
    }
  )
);
