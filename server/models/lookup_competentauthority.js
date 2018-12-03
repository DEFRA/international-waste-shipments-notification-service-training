'use strict'

module.exports = (sequelize, DataTypes) => {
  const lookupCompetentAuthority = sequelize.define('lookup_competentauthority', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    issystemuser: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'lookup_country',
        key: 'id'
      }
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    istransitauthority: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'lookup_competentauthority',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  })

  return lookupCompetentAuthority
}
