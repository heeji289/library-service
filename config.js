const dotenv = require("dotenv");
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

exports.config = {
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 5000)),
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
};
