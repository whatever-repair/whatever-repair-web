const auth = require('./controller');
const passport = require('passport');

// router.post('/signup', controller.register);
export default function adminRouter (router, passport) {
  router.post('/login', passport.authenticate('local', {
      failureRedirect:'/login',
      failureFlash: true
    }),
    (req, res) => {
      console.log('passport:::', req.header);
      res.redirect('/dbtest.html');
  });
}
