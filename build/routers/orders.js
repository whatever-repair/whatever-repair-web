'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _orderController = require('../../db/order/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var app = (0, _express2.default)();
var router = _express2.default.Router();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

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

router.route('/order').post(function (req, res) {
  var userReq = {
    repairType: req.body.repairType,
    message: req.body.message,
    reqDate: req.body.reqDate,
    private: {
      address: req.body.address,
      phone: req.body.phone,
      username: req.body.username
    }
  };

  _orderController2.default.insertOne(userReq, function (err) {
    if (err) {
      res.send('<h1>데이터 베이스 에러</h1>');
      return console.log('DB can\'t insert!!!', err);
    }
  });
});

module.exports = router;