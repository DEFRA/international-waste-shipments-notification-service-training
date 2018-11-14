'use strict'
module.exports = (sequelize, DataTypes) => {
  const lookupUnitedKingdomCompetentAuthority = sequelize.define('lookup_unitedkingdomcompetentauthority', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    unitedkingdomcountry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsaccountname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsbank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsbankaddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacssortcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsaccountnumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsiban: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsswiftbic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bacsemail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bacsfax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    remittancepostaladdress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'lookup_unitedkingdomcompetentauthority',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  })

  return lookupUnitedKingdomCompetentAuthority
}
