'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _orderController = require('../../db/order/orderController');

var _orderController2 = _interopRequireDefault(_orderController);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 파일 업로드를 가능하게 해줌. <form method="post" enctype="multipart/form-data"> <input type="file">

_mongoose2.default.Promise = global.Promise;

var app = (0, _express2.default)();

// 파일 업로드 위치 설정
var mpMiddleware = (0, _connectMultiparty2.default)({ uploadDir: __dirname + '/../../uploads/' });
var router = _express2.default.Router();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

_mongoose2.default.connect('mongodb://localhost/repair');

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connectio error'));
db.once('open', function () {
  return console.log('db connect');
});

// db 불러오기
router.route('/order').get(function (req, res) {
  _orderController2.default.findAll(function (err, data) {
    if (err) {
      return console.log('DB can\'t find!!!', err);
    }
    res.json(data);
  });
});

// db 쓰기
router.route('/order')

// multipart 미들웨어를 사용해야 req.files를 읽을 수 있음
.post(mpMiddleware, function (req, res) {
  console.log('body::: ', _typeof(req.body), req.body, 'files::: ', req.files);

  // 이미지 파일 존재 하는 것만 db에 쓰기 위한 코드
  var imageFiles = [req.files.image1, req.files.image2, req.files.image3];
  var fileNames = [];

  imageFiles.forEach(function (v, i) {
    if (v.size > 0) {
      var name = v.name.split('.');
      name[0] = name[0] + '_' + i;
      name = name.join('.');
      var path = v.path;
      var type = v.type;

      // 이미지 파일일 경우 처리 코드
      if (type.indexOf('image') > -1) {
        var outputPath = __dirname + '/../../uploads/' + Date.now() + '_' + name;
        fileNames[i] = outputPath.split('uploads/')[1];
        _fs2.default.rename(path, outputPath, function (err) {
          if (err) {
            console.log('image upload failed!!! ', err);
          }
          console.log('success image upload!!');
        });

        // 이미지 파일이 아닐 경우 삭제
      } else {
        _fs2.default.unlink(path, function (err) {
          if (err) {
            console.log('This is not image', err);
            res.sendStatus(400);
          }
        });
      }

      // 이미지 파일이 없을 경우 더미 파일 삭제 코드
    } else {
      _fs2.default.unlink(v.path, function (err) {
        if (err) {
          console.log('NO image error', err);
          res.sendStatus(400);
        }
      });
    }
  });

  console.log('imageFile::: ', imageFiles, 'fileName::: ', fileNames);

  // 몽구스 스키마 설정, 이미지가 없는 필드는 null을 입력하여 클라이언트에서 로드 할 때 건너 뛸 수 있도록 함
  var userReq = {
    repairType: req.body.repairType,
    message: req.body.message,
    reqDate: req.body.reqDate,
    image1: fileNames[0] || null,
    image2: fileNames[1] || null,
    image3: fileNames[2] || null,
    private: {
      address: req.body.address,
      phone: req.body.phone,
      username: req.body.username
    }
  };

  // db에 컬렉션을 save()하는 코드
  _orderController2.default.insertOne(userReq, function (err) {
    if (err) {
      res.send('<h1>데이터 베이스 에러</h1>');
      return console.log('DB can\'t insert!!!', err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;