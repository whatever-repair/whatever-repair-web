import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import orderController from '../../db/order/orderController';
import mongoose from 'mongoose';
import multipart from 'connect-multiparty';  // 파일 업로드를 가능하게 해줌. <form method="post" enctype="multipart/form-data"> <input type="file">

mongoose.Promise = global.Promise;

const app = express();
const mpMiddleware = multipart({ uploadDir: __dirname + '/../../uploads/' });
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/repair');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectio error'));
db.once('open', () => console.log('db connect'));

// db 불러오기
router.route('/order')
  .get((req, res) => {
    orderController.findAll((err, data) => {
      if (err) { return console.log('DB can\'t find!!!', err); }
      res.json(data);
    });
  });

// db 쓰기
router.route('/order')
  .post(mpMiddleware, (req, res) => {
    console.log('body::: ', typeof req.body, req.body, 'files::: ', req.files);
      var imageFile;
      var fileName;
    if (req.files.image.size > 0) {
      imageFile = req.files.image;
      const name = imageFile.name;
      const path = imageFile.path;
      const type = imageFile.type;

      if (type.indexOf('image') > -1) {
        const outputPath = __dirname + '/../../uploads/' + Date.now() + '_' + name;
        fileName = outputPath.split('uploads/')[1];
        console.log('fileName::: ', fileName);
        fs.rename(path, outputPath, (err) => {
          if (err) { console.log('image upload failed!!! ', err); }
          console.log('success image upload!!');
        });
      } else {
        fs.unlink(path, (err) => {
          console.log('not image type', err);
          res.sendStatus(400);
        });
      }
    }
    console.log('imageFile::: ', imageFile, 'fileName::: ', fileName);
    const userReq = {
      repairType: req.body.repairType,
      message: req.body.message,
      reqDate: req.body.reqDate,
      image: fileName || null,
      private: {
        address: req.body.address,
        phone: req.body.phone,
        username: req.body.username
      }
    };
    
    orderController.insertOne(userReq, (err) => {
      if (err) {
        res.send('<h1>데이터 베이스 에러</h1>');
        return console.log('DB can\'t insert!!!', err);
      }
      res.sendStatus(200);
    });
  });

  module.exports = router;
