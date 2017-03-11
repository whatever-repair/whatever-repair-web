const router = require('express').Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// router.post('/signup', controller.register);
router.post('/login', function(req, res) {
  const password = crypto.createHash('sha1', 'HyOJuNgSoNhAsHiNg')
    .update(req.body.password)
    .digest('base64');

  const encrypted = 'w9xWuGNSqbOtt7n258XBABcGtlc=';

  if (password === encrypted) {
    jwt.sign({
      username: 'whatever',
      admin: true
    }, 'HyOJuNgSoNhAsHiNg',
    {
      expiresIn: '1d',
      issuer: 'whatever-repair.com',
      subject: 'adminInfo'
    }, (err, token) => {
      if (err) res.send(404);
      res.json({token: token});
    });

  } else {
    res.status(400).json({
      success: false,
      message: '접근 권한이 없습니다.'
    });
  }

});

module.exports = router;
