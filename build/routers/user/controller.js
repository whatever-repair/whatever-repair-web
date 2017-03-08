'use strict';

var jwt = require('jsonwebtoken');
var User = require('../../../db/user/userModel');

/*
  POST /api/auth/signup
  {
    username,
    password
  }
*/

exports.register = function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  var newUser = null;

  // create a new user if does not exist
  var create = function create(user) {
    if (user) {
      throw new Error('username exists');
    } else {
      return User.create(username, password);
    }
  };

  // count the number of th user
  var count = function count(user) {
    newUser = user;
    return User.count({}).exec();
  };

  // assign admin if count is 1
  var assign = function assign(count) {
    if (count === 1) {
      newUser.admin = true;
      return true;
    } else {
      // if not, return a promise that returns false
      return Promise.resolve(false);
    }
  };

  var respond = function respond(isAdmin) {
    res.json({
      message: 'registered successful',
      admin: isAdmin ? true : false
    });
  };

  // run when there is an error (username exists)
  var onError = function onError(error) {
    res.status(409).json({
      message: error.message
    });
  };

  // check username duplication
  User.findOneByUsername(username).then(create).then(count).then(assign).then(respond).catch(onError);
};

/*
  POST /api/auth.login
  {
    username,
    password
  }
*/

exports.login = function (req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;

  var secret = req.app.get('jwt-secret');

  // check the user info & generate the jwt
  var check = function check(user) {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // user exist, check the password
      if (user.verify(password)) {
        // create a promise that generate jwt asyncronous
        var p = new Promise(function (resolve, reject) {
          jwt.sign({
            _id: user._id,
            username: user.username,
            admin: user.admin
          }, secret, {
            expiresIn: '7d',
            issuer: 'velopert.com',
            subject: 'userInfo'
          }, function (err, token) {
            if (err) reject(err);
            resolve(token);
          });
        });
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token
  var respond = function respond(token) {
    res.json({
      message: 'logged in successfully',
      token: token
    });
  };

  // error occured
  var onError = function onError(error) {
    res.status(403).json({
      message: error.message
    });
  };

  // find user
  User.findOneByUsername(username).then(check).then(respond).catch(onError);
};

/*
  GET /api/auth/check
*/

exports.check = function (req, res) {
  console.log('after next!!!');
  res.json({
    success: true,
    info: req.decoded
  });
};