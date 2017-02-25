const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  repairType: {
    type: String,
    required: true
  },
  message: String,
  image: String,
  reqDate: {
    type: String,
    required: true
  },
  private: {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true }
  },
  time: { type : Date, default: Date.now },
  status: { type : Number, default: 0 }
});

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel;
