module.exports = {
  // 가장 처음 읽을 스크립트파일
  // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
  entry: './src/index.js',

  // 파일을 합치고 ./public/bundle.js 에 저장한다.
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  // ES6 문법과 JSX 문법을 사용한다
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            cacheDirectory: true,
            presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.less$/,
        use: ["style-loader", {loader: 'css-loader', options: {sourceMap: 1}}, "less-loader"]
      }
    ]
  }
};
