import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import multipart from 'connect-multiparty';  // 파일 업로드를 가능하게 해줌. <form method="post" enctype="multipart/form-data"> <input type="file">
import mongoose from 'mongoose';

import orderRouter from './routers/orders.js';
import uploadRouter from './routers/upload.js';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();
app.io = socketio();
const server = require('http').createServer(app);
app.io.attach(server);

const port = 3000;
const devPort = 3001;
const config = require('../config.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('jwt-secret', config.secret);

// webpack-dev-server
if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');

  const config = require('../webpack.dev.config');
  let compiler = webpack(config);
  let devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
      console.log('webpack-dev-server is listening on port', devPort);
  });
}

app.use('/', express.static(__dirname + '/../public'));

// 라우팅 되는 곳.
app.use('/api', orderRouter);
app.use('/uploads', uploadRouter);

server.listen(port, () => {
  console.log('Express and socket.io listening on port', port);
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  console.log('socket connection!!!');
  socket.on('newOrder', (data) => {
    console.log('server receive newOrder!!', data);
    io.sockets.emit('push', data);
  });
});

module.exports = server;
