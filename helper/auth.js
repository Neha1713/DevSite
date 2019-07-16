//Prevent Dashboard access without authentication

module.exports = {
  Authenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/login')
    }
  }
}
