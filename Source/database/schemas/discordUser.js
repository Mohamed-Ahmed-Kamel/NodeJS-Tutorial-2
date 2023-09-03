const mongoose = require("mongoose");

// Scheam
const discord_user = new mongoose.Schema({
  discordID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

// modil
const discord_model = mongoose.model("Discord_User", discord_user);
module.exports = discord_model
