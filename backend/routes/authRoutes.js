const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect after successful authentication
  }
);

module.exports = router;
