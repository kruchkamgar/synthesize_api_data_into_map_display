const { environment } = require('@rails/webpacker')
const erb = require('./loaders/erb')

// environment.config.merge({ externals: "{ mapbox-gl: 'mapbox-gl'}" }) # correct?


environment.loaders.prepend('erb', erb)

module.exports = environment
