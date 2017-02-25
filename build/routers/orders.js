'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orderController = require('../../db/order/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

_mongoose2.default.connect('mongodb://localhost/repair');

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connectio error'));
db.once('open', function () {
  return console.log('db connect');
});

router.route('/order').get(function (req, res) {
  _orderController2.default.findAll(function (err, data) {
    if (err) {
      return console.log('DB can\'t find!!!', err);
    }
    res.send(data);
  });
});

module.exports = router;