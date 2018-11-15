const db = require('../models')
const Op = require('sequelize').Op
const uuid = require('uuid')

module.exports = {
  create: async function (request) {
    const id = uuid.v4()
    request.payload.id = id

    let competentAuthority = await db.lookup_competentauthority.findOne({ where: { abbreviation: request.payload.authority.toUpperCase() } })
    let unitedKingdomCompetentAuthority = await db.lookup_unitedkingdomcompetentauthority.findOne({ where: { competentauthorityid: competentAuthority.id } })
    let shipmentType = await db.lookup_notificationtype.findOne({ where: { description: { [Op.iLike]: request.payload.type } } })
    let notification = {
      id: id,
      notificationtype: shipmentType.id,
      notificationnumber: request.payload.notificationNumber,
      userid: 'user',
      rowversion: '1',
      competentauthority: unitedKingdomCompetentAuthority.id,
      createddate: new Date(),
      reasonforexport: 'reason',
      hasspecialhandlingrequirements: true,
      specialhandlingdetails: 'details',
      isrecoverypercentagedataprovidedbyimporter: true,
      wastegenerationprocess: 'process',
      iswastegenerationprocessattached: true
    }

    db.notification_notification.upsert(notification)
  },
  get: async function (id) {
    let notification = await db.notification_notification.findOne({ where: { id: id } })
    return notification
  },
  getbynumber: async function (notificationNumber) {
    let notification = await db.notification_notification.findOne({ where: { notificationnumber: notificationNumber } })
    return notification
  }
}
