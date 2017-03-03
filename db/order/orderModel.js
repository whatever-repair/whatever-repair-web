const mongoose = require('mongoose');

//FIXME: 추후 스키마 수정
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
  created_time: { type : Date, default: Date.now },
  status: { type : Number, default: 0 }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
