# gatsby-plugin-postcss
Provides drop-in support for PostCSS.

## How to use
1. Include the plugin in your `gatsby-config.js` file.
2. Write your stylesheets with your desired PostCSS featureset and require/import those plugins

```javascript
// in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [
        somePostCssPlugin()
      ]
    }
  }
]
```
