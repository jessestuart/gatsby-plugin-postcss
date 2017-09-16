"use strict";

var ExtractTextPlugin = require(`extract-text-webpack-plugin`);

var _require = require(`gatsby-1-config-css-modules`),
    cssModulesConfig = _require.cssModulesConfig;

exports.modifyWebpackConfig = function (_ref, options) {
  var config = _ref.config,
      stage = _ref.stage;

  // Pass in plugins regardless of stage.
  // If none specified, fallback to Gatsby default postcss plugins.
  if (options.postCssPlugins) {
    config.merge(function (current) {
      current.postcss = options.postCssPlugins;
      return current;
    });
  }

  var cssFiles = /\.css$/;

  switch (stage) {
    case `develop`:
      {
        config.loader(`styleModules`, {
          test: cssFiles,
          loaders: [`style`, cssModulesConfig(stage), `postcss`]
        });
        return config;
      }
    case `build-css`:
      {
        config.loader(`styleModules`, {
          test: cssFiles,
          loader: ExtractTextPlugin.extract(`style`, [cssModulesConfig(stage), `postcss`])
        });
        return config;
      }
    case `develop-html`:
    case `build-html`:
      {
        config.loader(`styleModules`, {
          test: cssFiles,
          loader: ExtractTextPlugin.extract(`style`, [cssModulesConfig(stage), `postcss`])
        });
        return config;
      }
    case `build-javascript`:
      {
        config.loader(`styleModules`, {
          test: cssFiles,
          loader: ExtractTextPlugin.extract(`style`, [cssModulesConfig(stage)])
        });
        return config;
      }
    default:
      {
        return config;
      }
  }
};
