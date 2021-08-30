const passport = require("passport");
const bcrypt = require("bcrypt");

const UserService = require("../services/user");

const { config } = require("../config");

module.exports = class UserController {
  // 회원가입 기능
  static async join(req, res) {
    const { email, username, password, passwordcheck } = req.body;
    try {
      const exUser = await UserService.findUserByEmail(email);

      // 중복 이메일 검사
      if (exUser) {
        return res.status(400).redirect(`?error=already`);
      }
      // 비밀번호 확인
      if (password !== passwordcheck) {
        return res.status(400).redirect(`?error=wrongpassword`);
      }
      const hashed_password = await bcrypt.hash(
        password,
        config.bcrypt.saltRounds
      );

      await UserService.createUser({
        email,
        username,
        password: hashed_password,
      });
      return res.status(201).redirect("/auth/login");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  // 로그인 기능
  static login(req, res, next) {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.status(401).redirect(`?loginError=${info.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.status(200).redirect("/");
      });
    })(req, res, next);
  }

  // 로그아웃 기능
  static logout(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  }
};
