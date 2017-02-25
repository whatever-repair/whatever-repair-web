import express from 'express';
import orderController from '../../db/order/orderController';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connect('mongodb://localhost/repair');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectio error'));
db.once('open', () => console.log('db connect'));

router.route('/order')
  .get((req, res) => {
    orderController.findAll((err, data) => {
      if (err) { return console.log('DB can\'t find!!!', err) }
      res.send(data);
    });
  });

  module.exports = router;