const OrderModel = require('./orderModel');

function findAll(callback) {
  OrderModel.find({}, callback);
}

exports.findAll = findAll;