const OrderModel = require('./orderModel');

// db의 모든 내용을 읽어옴
function findAll(callback) {
  OrderModel.find({}, callback);
}

// db에 한가지를 씀
// function insertOne(userReq, callback) {
//   OrderModel.create(userReq, callback);
// }
function insertOne(userReq, callback) {
  var order = new OrderModel(userReq);
  order.save(callback);
}

exports.findAll = findAll;
exports.insertOne = insertOne;