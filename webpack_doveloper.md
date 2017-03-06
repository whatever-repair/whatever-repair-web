[출처: 벨로퍼트 님 블로그](https://velopert.com/1492)

**서버가 개발모드 일 때는, Express.js 서버와 webpack-dev-server 를 함께 실행하며, 
webpack-dev-server 에 proxy를 적용하여 해당 서버에서도 Express.js 서버에 구현된 라우트에 접근 하는 방법을 알아볼것입니다.**

# Node.js 프로젝트 생성하기
    npm init
 
# 의존모듈 설치하기
    npm install --save express react react-dom
 
# 개발 의존 모듈 설치하기
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react react-hot-loader webpack webpack-dev-server

# 글로벌 모듈 설치
    npm install -g babel-cli

# 디렉토리 이해하기
    mkdir build server public src server/routes && touch public/index.html server/main.js server/routes/posts.js src/App.js src/index.js webpack.dev.config.js

    ./
    ├── .babelrc                # babel 설정파일
    ├── build                   # 서버 빌드 디렉토리
    ├── package.json 
    ├── public                  # 클라이언트 디렉토리
    │    ├── bundle.js          # 컴파일된 스크립트
    │    └── index.html         # 메인 페이지
    ├── server                  # 서버 디렉토리 (ES6)
    │    ├── main.js            # 서버 사이드 메인 스크립트
    │    └── routes
    │        └── posts.js       # 예제 라우터
    ├── src
    │    ├── App.js             # App 컴포넌트
    │    └── index.js           # 클라이언트 사이드 메인 스크립트
    ├── webpack.config.js       # webpack 설정파일
    └── webpack.dev.config.js   # webpack-dev-server 를 위한 설정파일

# npm 스크립트 작성하기
    /* ... */
      "scripts": {
        "clean": "rm -rf build public/bundle.js",
        "build": "babel server --out-dir build && ./node_modules/.bin/webpack",
        "start": "NODE_ENV=production node ./build/main.js",
        "development": "NODE_ENV=development node ./build/main.js"
      },
    /* ... */

# 개발 모드 전용 webpack 설정파일 작성하기
    webpack.dev.config.js

왜 다른 config 를 사용하나요?
기존 config 는 output인 bundle.js 를 public 디렉토리에 저장하도록 설정이 되어있습니다.
webpack-dev-server 에서도 동일한 설정을 적용한다면, public 에 있는 파일이 계속 덮어씌워지겠죠?
저희 webpack-dev-server 에선 bundle.js 를 메모리에 저장한후,
나중에 브라우저에서  bundle.js 를 요청 할 시 public 디렉토리에 이미 있는 bundle.js 보다 우선권을 가져서 메모리에 있는걸 리턴하게됩니다.
또한, 추후 react-hot-loader 를 통해 변경된 컴포넌트만 리로드 하는 시스템을 구현할 건데요,
production 모드에선 이게 필요하지 않으므로 다른 config 를 설정합니다.


