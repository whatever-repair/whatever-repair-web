const jwt = require('jsonwebtoken');
// const SECRET = app.get('jwt-secret');
const EXPIRES = '1D';

// jwt 토큰 생성 함수
function signToken(id) {
  // return jwt.sign({id: id}, SECRET, {
  //   expiresIn: EXPIRES
  // });
}

// 토큰을 해석하여 유저 정보를 얻는 함수
function isAuth() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      let decoded = jwt.verify(req.headers.authorization, SECRET);
      console.log(decoded);
      req.user = decoded;
    })
    // Attach user to request
    .use(function(req, res, next) {
      req.user = {
        id: req.user.id,
        name: 'name of ' + req.user.id
      };
      next();
    });
}

exports.signToken = signToken;
exports.isAuth = isAuth;
