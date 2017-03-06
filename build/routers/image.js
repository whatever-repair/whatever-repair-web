'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();
app.use(_bodyParser2.default.json());

router.route('/images/:id').get(function (req, res) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../../db/images/' + req.params.id, function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }).then(function (data) {
    res.send(data);
  });

  // app.use('/', express.static(__dirname + '/../../db/images'));
});

module.exports = router;