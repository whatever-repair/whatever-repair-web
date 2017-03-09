'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _orders = require('./orders.js');

var _orders2 = _interopRequireDefault(_orders);

var _upload = require('./upload.js');

var _upload2 = _interopRequireDefault(_upload);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(router, passport) {
  router.use('/api', _orders2.default);

  router.use('/uploads', function (req, res, next) {
    (0, _upload2.default)(router);
  });

  router.use('/admin', _admin2.default);
}