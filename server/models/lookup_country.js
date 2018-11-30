'use strict'

module.exports = (sequelize, DataTypes) => {
  const lookupCountry = sequelize.define('lookup_country', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    isoalpha2code: DataTypes.STRING,
    iseuropeanunionmember: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'lookup_country',
    createdAt: false,
    updatedAt: false
  })

  lookupCountry.associate = (models) => {
    // associations can be defined here
  }
  return lookupCountry
}
