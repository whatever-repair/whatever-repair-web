const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../../config');

mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
});

User.statics.create = function(username, password) {
  const encrypted = crypto.createHmac('sha1', config.secret)
    .update(password)
    .digest('base64');

  const user = new this({
    username,
    password: encrypted
  });

  return user.save();
};

User.statics.findOneByUsername = function(username) {
  return this.findOne({
    username
  }).exec();
};

User.methods.verify = function(password) {
  const encrypted = crypto.createHmac('sha1', config.secret)
    .update(password)
    .digest('base64');

  return this.password === encrypted;
};

module.exports = mongoose.model('User', User);
