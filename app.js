const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const methodOverride = require("method-override");

// const { swaggerUi, specs } = require("./config/swagger.js");
const { config } = require("./config");

const redis = require("redis");
const RedisStore = require("connect-redis")(session);

dotenv.config();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

const indexRouter = require("./routes");
const authRouter = require("./routes/auth.js");
const ratingRouter = require("./routes/rating.js");
const bookRouter = require("./routes/book");

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
};

passportConfig();
app.set("port", process.env.PORT || config.port);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false }) //
  .then(() => {
    console.log("DB connected 🎁");
  })
  .catch(console.log);

// Middlewares
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({ client: redisClient }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/", bookRouter);
app.use("/rating", ratingRouter);

// Error Handling
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} no router`);
  error.status = 404;
  logger.error(error.message);
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Server
app.listen(config.port, "0.0.0.0");
