exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("Please login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("You already logged in");
    res.redirect(`/?error=${message}`);
  }
};

// flash
exports.flash = (req, res, next) => {
  // 플래시 메시지가 있다면
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
};
