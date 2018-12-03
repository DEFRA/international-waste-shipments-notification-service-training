'use strict'

module.exports = (sequelize, DataTypes) => {
  const lookupNotificationType = sequelize.define('lookup_notificationtype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'lookup_notificationtype',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  })

  return lookupNotificationType
}
