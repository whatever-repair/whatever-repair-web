'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

// 클라이언트에서 /upload/파일네임 요청을 받아 파일네임을 params 처리하여 이미지파일을 불러 오는 코드
router.route('/:id').get(function (req, res) {
  console.log('dirname::: ', __dirname);
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(__dirname + '/../../uploads/' + req.params.id, function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  }).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    console.log('image upload failed!!! ', err);
    res.sendStatus(400);
  });
});

module.exports = router;