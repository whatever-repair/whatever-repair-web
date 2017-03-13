const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export default function login(req, res) {
  let encrypted = crypto.createHash('sha256')
    .update(req.body.password)
    .digest('base64');
    if (req.body.name === 'admin' && encrypted === 'vmf7ZrO+qH5ovL/uf5C4lvtTlZEnWFg4qRKKIiEIt9c=') {
      const p = new Promise((resolve, reject) => {
        const secret = req.app.get('jwt-secret');
        jwt.sign({
          username: req.body.name,
        }, secret,
        {
          expiresIn: '1d',
          issuer: 'whatever-repair.com',
          subject: 'userInfo'
        }, (err, token) => {
          if (err) res.redirect('/login.html');
          res.json({
            message: 'logged in successfully',
            token
          });
        });
      });
    return p;
    } else {
      res.status(400).json({ message: '접근 권한이 없습니다' });
    }
}
