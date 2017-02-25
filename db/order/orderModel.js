const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  repairType: Number,
  message: String,
  image: String,
  date: Date,
  private: {
    address: String,
    phone: Number,
    username: String,
  }
});

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel;
