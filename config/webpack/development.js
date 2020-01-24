
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

nodeModules_loader =
environment.loaders.find(loader =>
  loader.key == "nodeModules" )
//
// nodeModules_loader.value.exclude['mapbox-gl'] = 'mapbox-gl';
// throw JSON.stringify(environment.loaders.find(loader => loader.key == "nodeModules"), null, 2)

// environment.loaders.insert(
//   'mapbox-loader',
//   {
//     test: /mapbox.*\.js$/,
//     use: 'script-loader'
//   }
// );

environment.loaders.delete('nodeModules')

module.exports = environment.toWebpackConfig()
