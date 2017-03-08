import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import orderController from '../../db/order/orderController';
import mongoose from 'mongoose';
import multipart from 'connect-multiparty';  // 파일 업로드를 가능하게 해줌. <form method="post" enctype="multipart/form-data"> <input type="file">
import user from './user';

mongoose.Promise = global.Promise;

const app = express();

// 파일 업로드 위치 설정
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

  // multipart 미들웨어를 사용해야 req.files를 읽을 수 있음
  .post(mpMiddleware, (req, res) => {

    // 이미지 파일 존재 하는 것만 db에 쓰기 위한 코드
    let imageFiles = [req.files.image1, req.files.image2, req.files.image3];
    let fileNames = [];
    
    imageFiles.forEach((v, i) => {
      if (v.size > 0) {
        let name = v.name.split('.');
        name[0] = name[0] + '_' + i;
        name = name.join('.');
        let path = v.path;
        let type = v.type;

        // 이미지 파일일 경우 처리 코드
        if (type.indexOf('image') > -1) {
          let outputPath = __dirname + '/../../uploads/' + Date.now() + '_' + name;
          fileNames[i] = outputPath.split('uploads/')[1];
          fs.rename(path, outputPath, (err) => {
            if (err) { console.log('image upload failed!!! ', err); }
            console.log('success image upload!!');
          });

        // 이미지 파일이 아닐 경우 삭제
        } else {
          fs.unlink(path, (err) => {
            if (err) {
              console.log('This is not image', err);
              res.sendStatus(400);
            }
          });
        }

      // 이미지 파일이 없을 경우 더미 파일 삭제 코드
      } else {
        fs.unlink(v.path, (err) => {
          if (err) {
            console.log('there is no image', err);
            res.sendStatus(400);
          }
        });
      }
    });

    // 몽구스 스키마 설정, 이미지가 없는 필드는 null을 입력하여 클라이언트에서 로드 할 때 건너 뛸 수 있도록 함
    const userReq = {
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
    orderController.insertOne(userReq, (err) => {
      if (err) {
        res.send('<h1>데이터 베이스 에러</h1>');
        return console.log('DB can\'t insert!!!', err);
      }
      
      res.sendStatus(200);
    });
  });

  router.route('/order')
    .put((req, res) => {
      let userReq = req.body;

      orderController.editOne(userReq, (err) => {
        if (err) {
          res.send('<h1>데이터 베이스 에러</h1>');
          return console.log('DB can\'t insert!!!', err);
        }
        res.sendStatus(200);
      });
    });

  // user route
  router.use('/user', user);

  module.exports = router;
