'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    app_id: DataTypes.STRING,
    app_name: DataTypes.STRING,
    app_version: DataTypes.STRING,
    device_name: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING,
    os_name: DataTypes.STRING,
    supports_encryption: DataTypes.STRING,
    cloudhook_url: DataTypes.STRING,
    remote_ui_url: DataTypes.STRING,
    secret: DataTypes.STRING,
    webhook_id: DataTypes.STRING,
    register_timestamp: DataTypes.STRING,
    login_timestamp: DataTypes.STRING
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};