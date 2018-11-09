const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/notification'),
  require('../routes/notificationTypes'),
  require('../routes/lookupCountry')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
