require('dotenv').config({ path: '../../../.env' }); // Go up to the root directory
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const router = express.Router();
// Client ID and Client Secret from your GitHub OAuth application
const CLIENT_ID = process.env.GIT_CLIENT_ID;
const CLIENT_SECRET = process.env.GIT_CLIENT_SECRETE;
// console.log(CLIENT_ID,CLIENT_SECRET)
// Configure session
router.use(
  session({ secret: CLIENT_SECRET, resave: false, saveUninitialized: true })
);

// Initialize Passport and restore authentication state, if any, from the session
router.use(passport.initialize());
router.use(passport.session());

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Use the GitHubStrategy within Passport
passport.use(
  new GitHubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3012/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // In a production-use case, you might save any needed profile information to your database here
      return done(null, profile);
    }
  )
);

// Redirect to GitHub for authentication
router.get('/auth/github', passport.authenticate('github'));

// GitHub will redirect to this URL after approval/denial
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home or to another page
    res.redirect('/success'); // Update this URL as needed
  }
);

// Define the success route
router.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Authentication successful!', user: req.user });
  } else {
    res.json({ message: 'Not authenticated' });
  }
});

// Define the login route (optional)
router.get('/login', (req, res) => {
  res.send('Login Page');
});

module.exports = router;
