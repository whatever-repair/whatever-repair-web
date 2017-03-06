const OrderModel = require('./orderModel');

// db의 모든 내용을 읽어옴
function findAll(callback) {
  OrderModel.find({}, callback);
}

// db에 한가지를 씀
function insertOne(userReq, callback) {
  var order = new OrderModel(userReq);
  order.save(callback);
}

//TODO: 수정 및 삭제 코드 작성
function editOne(userReq, callback) {
  var id = userReq.id;
  OrderModel.findOneAndUpdate({_id: id}, {$set: {status: parseInt(userReq.value)}}, callback);
}


exports.findAll = findAll;
exports.insertOne = insertOne;
exports.editOne = editOne;
