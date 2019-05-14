'use strict';
module.exports = (sequelize, DataTypes) => {
  const iMote = sequelize.define('iMote', {
    serial_number: DataTypes.STRING,
    token: DataTypes.STRING,
    url: DataTypes.STRING,
    push_token: DataTypes.STRING,
    push_url: DataTypes.STRING,
    wifi_ssid: DataTypes.STRING
  }, {});
  iMote.associate = function(models) {
    // associations can be defined here
  };
  return iMote;
};