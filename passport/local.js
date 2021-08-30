const passport = require("passport");
const Local = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

module.exports = () => {
  passport.use(
    new Local(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "Wrong password" });
            }
          } else {
            done(null, false, { message: "Unregistered user" });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
