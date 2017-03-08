'use strict';

var jwt = require('jsonwebtoken');

var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.headers['x-access-token'] || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'not logged in'
    });
  }

  var p = new Promise(function (resolve, reject) {
    jwt.verify(token, req.app.get('jwt-secret'), function (err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  var onError = function onError(err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  };

  p.then(function (decoded) {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = authMiddleware;