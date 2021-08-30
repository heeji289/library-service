const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          _json: { id, login, email },
        } = profile;
        console.log(profile);
        try {
          const exUser = await User.findOne({
            where: { email, provider: "github" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email,
              password: id,
              username: login,
              provider: "github",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
