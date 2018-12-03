'use strict'

module.exports = (sequelize, DataTypes) => {
  const notificationNotification = sequelize.define('notification_notification', {
    id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    notificationtype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lookup_notificationtype',
        key: 'id'
      }
    },
    competentauthority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notificationnumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rowversion: {
      type: 'BYTEA',
      allowNull: false
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reasonforexport: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hasspecialhandlingrequirements: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    specialhandlingdetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isrecoverypercentagedataprovidedbyimporter: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wastegenerationprocess: {
      type: DataTypes.STRING,
      allowNull: true
    },
    iswastegenerationprocessattached: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'notification_notification',
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
  })

  return notificationNotification
}
