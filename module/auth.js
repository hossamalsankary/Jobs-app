const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//UserSchema

const User = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
  
  },
});
//decrypt password befor saveing it
User.pre("save", async function () {
    console.log("hash");
  var salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//create token
User.methods.createJWT = function() {
  return jwt.sign(
    {
      data: { name: this.name, email: this.email },
    },
    process.env.SECRET,
    { expiresIn: "30d" }
  );
};

//Compare The Password
User.methods.compare = async function (password) {
  const ismatch =  bcrypt.compare(password, this.password);
  return ismatch;
};

module.exports = mongoose.model("Users", User);
