# atomic-plugin
Webpack Plugin for compiling atomic css

The code is mainly copied from [atomic-loader][atomic-loader].  Thank you Tom
Wu for your work.

I just believe that the solution as a Plugin is more suitable for a webpack
configuration, as the generated atomic stylesheet file can then be handled as a
webpack asset.  So, when you use, the webpack-dev-server, it gets served as
well.

## Install
```
$ npm install atomic-plugin --save
```

## Usage

Add the plugin to your webpack config:


  ```javascript
  plugins: [
        new AtomicPlugin('atomic.css', 'path/to/atomCssConfig.js'),
      ]
  ```


For more information on the atomizer, visit the webpage:
[yahoo/atomizer](https://github.com/yahoo/atomizer).

## TODO

- Figure out, how to inject a `[hash]` value into the atomic.css output.

[atomic-loader]: https://github.com/tom76kimo/atomic-loader
