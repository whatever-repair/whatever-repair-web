var webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // 이 파일 부터 require 를 재귀적으로 불러옴 배열로 여러 파일도 가능.

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js' // 아웃풋
  },

  devServer: {
    hot: true, // 파일 수정 시 마다 브라우저 새로 고침.
    inline: true, // 웹 팩 데브 서버의 클라이언트를 웹팩에 포함?
    host: '0.0.0.0', // 다른 서버를 사용할 경우.
    port: 4000,
    contentBase: __dirname + '/public/', // 인덱스 파일 위치
  },

  module:{
    loaders: [
      {
        test: /.js$/,
        loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react']
        })],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};
