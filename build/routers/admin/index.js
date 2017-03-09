'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adminRouter;
var auth = require('./controller');
var passport = require('passport');

// router.post('/signup', controller.register);
function adminRouter(router, passport) {
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), function (req, res) {
    console.log('passport:::', req.header);
    res.redirect('/dbtest.html');
  });
}