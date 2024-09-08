const express = require('express');
const passport = require('passport');
const router = express.Router();
const sendToken = require('../utils/jwtToken'); // Import sendToken function

// Route for Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    if (req.user) {
      const token = req.user.getJwtToken();

      // Options for cookies
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      

      // Set the token in cookies
      res.cookie("token", token, options);

      // Redirect to frontend application
      res.redirect('http://localhost:3000');
    } else {
      res.redirect('/'); // Redirect to homepage if authentication fails
    }
  }
);


module.exports = router;
