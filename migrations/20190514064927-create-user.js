'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      serial_number: {
        type: Sequelize.STRING
      },
      app_id: {
        type: Sequelize.STRING
      },
      app_name: {
        type: Sequelize.STRING
      },
      app_version: {
        type: Sequelize.STRING
      },
      device_name: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      os_name: {
        type: Sequelize.STRING
      },
      supports_encryption: {
        type: Sequelize.STRING
      },
      cloudhook_url: {
        type: Sequelize.STRING
      },
      remote_ui_url: {
        type: Sequelize.STRING
      },
      secret: {
        type: Sequelize.STRING
      },
      webhook_id: {
        type: Sequelize.STRING
      },
      register_timestamp: {
        type: Sequelize.STRING
      },
      login_timestamp: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};