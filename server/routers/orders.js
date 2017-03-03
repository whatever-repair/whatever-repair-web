import express from 'express';
import bodyParser from 'body-parser';
import orderController from '../../db/order/orderController';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const app = express();
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
      if (err) { return console.log('DB can\'t find!!!', err) }
      res.json(data);
    });
  });

// db 쓰기
router.route('/order')
  .post((req, res) => {
    const userReq = {
      repairType: req.body.repairType,
      message: req.body.message,
      reqDate: req.body.reqDate,
      private: {
        address: req.body.address,
        phone: req.body.phone,
        username: req.body.username
      }
    }
    
    orderController.insertOne(userReq, (err) => {
      if (err) {
        res.send('<h1>데이터 베이스 에러</h1>');
        return console.log('DB can\'t insert!!!', err)
      }
      res.sendStatus(200);
    });
  });

  module.exports = router;
