'use strict';

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();


// router.post('/signup', controller.register);
router.post('/login', _login2.default);

module.exports = router;