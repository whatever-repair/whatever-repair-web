import fs from 'fs';
import express from 'express';

const app = express();
const router = express.Router();

// 클라이언트에서 /upload/파일네임 요청을 받아 파일네임을 params 처리하여 이미지파일을 불러 오는 코드
router.route('/:id')
  .get((req, res) => {
    console.log('dirname::: ',__dirname);
    return new Promise(function(resolve, reject) {
      fs.readFile(__dirname + '/../../uploads/' + req.params.id, (err, data) => {
        if (err) { return reject(err); }
        return resolve(data);
      });
    })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      console.log('image upload failed!!! ', err);
      res.sendStatus(400);
    });
  });

module.exports = router;
