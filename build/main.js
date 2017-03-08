'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _orders = require('./routers/orders.js');

var _orders2 = _interopRequireDefault(_orders);

var _upload = require('./routers/upload.js');

var _upload2 = _interopRequireDefault(_upload);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // 파일 업로드를 가능하게 해줌. <form method="post" enctype="multipart/form-data"> <input type="file">

app.io = (0, _socket2.default)();
var server = require('http').createServer(app);
app.io.attach(server);

var port = 3000;
var devPort = 3001;
var config = require('../config.js');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.set('jwt-secret', config.secret);

// webpack-dev-server
if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');

  var _config = require('../webpack.dev.config');
  var compiler = (0, _webpack2.default)(_config);
  var devServer = new _webpackDevServer2.default(compiler, _config.devServer);
  devServer.listen(devPort, function () {
    console.log('webpack-dev-server is listening on port', devPort);
  });
}

app.use('/', _express2.default.static(__dirname + '/../public'));

// 라우팅 되는 곳.
app.use('/api', _orders2.default);
app.use('/uploads', _upload2.default);

server.listen(port, function () {
  console.log('Express and socket.io listening on port', port);
});

var io = _socket2.default.listen(server);
io.sockets.on('connection', function (socket) {
  console.log('socket connection!!!');
  socket.on('newOrder', function (data) {
    console.log('server receive newOrder!!', data);
    io.sockets.emit('push', data);
  });
});

module.exports = server;