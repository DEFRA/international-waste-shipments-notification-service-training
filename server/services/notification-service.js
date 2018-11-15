const db = require('../models')
const Op = require('sequelize').Op
const uuid = require('uuid')

module.exports = {
  createOrUpdate: async function (request) {
    let notification = await this.getByNumber(request.payload.notificationNumber)
    // if no notification exists then create a new one with default values
    if (notification == null) {
      notification = {
        id: this.generateId(),
        notificationnumber: request.payload.notificationNumber,
        userid: 'user',
        rowversion: '1',
        createddate: new Date(),
        reasonforexport: 'reason',
        hasspecialhandlingrequirements: true,
        specialhandlingdetails: 'details',
        isrecoverypercentagedataprovidedbyimporter: true,
        wastegenerationprocess: 'process',
        iswastegenerationprocessattached: true
      }
    }

    // update values of data supplied from front end
    let competentAuthority = await this.getCompetentAuthority(request.payload.authority)
    notification.competentauthority = competentAuthority.id
    let shipmentType = await this.getShipmentType(request.payload.type)
    notification.notificationtype = shipmentType.id

    db.notification_notification.upsert(notification)
  },
  get: async function (id) {
    let notification = await db.notification_notification.findOne({ where: { id: id } })
    return notification
  },
  getByNumber: async function (notificationNumber) {
    let notification = await db.notification_notification.findOne({ where: { notificationnumber: notificationNumber } })
    return notification
  },
  generateId: function () {
    return uuid.v4()
  },
  getShipmentType: async function (type) {
    let shipmentType = await db.lookup_notificationtype.findOne({ where: { description: { [Op.iLike]: type } } })
    return shipmentType
  },
  getCompetentAuthority: async function (authority) {
    let competentAuthority = await db.lookup_competentauthority.findOne({ where: { abbreviation: authority.toUpperCase() } })
    let unitedKingdomCompetentAuthority = await db.lookup_unitedkingdomcompetentauthority.findOne({ where: { competentauthorityid: competentAuthority.id } })
    return unitedKingdomCompetentAuthority
  }
}
