'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = login;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

function login(req, res) {
  var encrypted = crypto.createHash('sha256').update(req.body.password).digest('base64');
  if (req.body.username === 'admin' && encrypted === 'vmf7ZrO+qH5ovL/uf5C4lvtTlZEnWFg4qRKKIiEIt9c=') {
    var p = new Promise(function (resolve, reject) {
      var secret = req.app.get('jwt-secret');
      jwt.sign({
        username: req.body.username
      }, secret, {
        expiresIn: '1d',
        issuer: 'whatever-repair.com',
        subject: 'userInfo'
      }, function (err, token) {
        if (err) res.redirect('/login.html');
        res.json({
          message: 'logged in successfully',
          token: token
        });
      });
    });
    return p;
  } else {
    res.json({ message: '접근 권한이 없습니다' });
  }
}