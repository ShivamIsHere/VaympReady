const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config({ path: '/config/.env' });

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v2/authRoutes/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if a user with this googleId already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            // Create a new user with the plain googleId
            const newUser = {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: {
                url: profile.photos[0].value,
              },
            };
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
