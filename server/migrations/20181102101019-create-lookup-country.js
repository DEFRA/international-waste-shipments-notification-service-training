'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lookup_countries', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      isoalpha2code: {
        type: Sequelize.STRING
      },
      iseuropeanunionmember: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lookup_countries')
  }
}
