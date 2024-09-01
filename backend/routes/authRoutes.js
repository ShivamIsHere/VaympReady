const express = require('express');
const passport = require('passport');
const router = express.Router();
const sendToken = require('../utils/jwtToken'); // Import sendToken function

// Route for Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    sendToken(req.user, 200, res); // Send token in cookies
    res.redirect('http://localhost:3000'); // Redirect to your front-end application
  }
);


module.exports = router;
