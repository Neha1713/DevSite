const express = require('express');
const router = express.Router();
const passport = require('passport');


//Google Route
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


//Github Route
router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
   res.redirect('/dashboard');
  }
);


//Logout Route
router.get('/logout', (req,res) => {
  req.logOut()
  res.redirect('/logout')
})

module.exports = router;