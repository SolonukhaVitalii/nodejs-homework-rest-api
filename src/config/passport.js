const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { UserServices } = require('../services/users');
require('dotenv').config();
const SECRET_WORD = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_WORD,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const service = new UserServices();
      const user = await service.findById(payload.id);

      if (!user) {
        return done(new Error('User not found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  }),
);