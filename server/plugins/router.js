const routes = [].concat(
  require('../routes/about'),
  require('../routes/home'),
  require('../routes/competent-authorities'),
  require('../routes/countries'),
  require('../routes/notification'),
  require('../routes/notification-types'),
  require('../routes/united-kingdom-competent-authorities')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
