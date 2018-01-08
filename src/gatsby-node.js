'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const _require = require('gatsby-1-config-css-modules')
const cssModulesConfig = _require.cssModulesConfig

exports.modifyWebpackConfig = function(_ref, options) {
  var config = _ref.config,
    stage = _ref.stage

  // Pass in plugins regardless of stage.
  // If none specified, fallback to Gatsby default postcss plugins.
  if (options.postCssPlugins) {
    config.merge(current => {
      current.postcss = options.postCssPlugins
      return current
    })
  }

  const dynamicCssFiles = /(components|pages|layouts)\/.*\.css$/
  const staticCssFiles = /assets-spa\/css\/.*\.css$/

  switch (stage) {
    case 'develop': {
      config.loader('staticStyles', {
        test: staticCssFiles,
        loaders: ['style', 'css?modules&importLoaders=1', 'postcss'],
      })
      config.loader('styleModules', {
        test: dynamicCssFiles,
        loaders: ['style', cssModulesConfig(stage), 'postcss'],
      })
      return config
    }
    case 'build-css': {
      config.loader('styleModules', {
        test: dynamicCssFiles,
        loader: ExtractTextPlugin.extract('style', [
          cssModulesConfig(stage),
          'postcss',
        ]),
      })
      console.log('build-css')
      return config
    }
    case 'develop-html':
    case 'build-html':
    case 'build-javascript': {
      config.loader('styleModules', {
        test: dynamicCssFiles,
        loader: ExtractTextPlugin.extract('style', [
          cssModulesConfig(stage),
          'postcss',
        ]),
      })
      return config
    }
    default: {
      return config
    }
  }
}
