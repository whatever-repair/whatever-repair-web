'use strict';

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();


router.post('/signup', _controller2.default.register);
router.post('/login', _controller2.default.login);

module.exports = router;