'use strict';
var Atomizer = require('atomizer');
var JS_REGEX = /\.js$/;

var configObject = {
    configs: {
        classNames: []
    }
};

function AtomicPlugin(cssDestFile, configPath) {
    this.cssDestFile = cssDestFile || "atomic.css";
    this.configObject = configPath ? require(require.resolve(configPath)) : configObject;
    this.foundClasses = [];
}

module.exports = AtomicPlugin;
AtomicPlugin.prototype.apply = function(compiler) {
    var cssDestFile = this.cssDestFile;
    var atomizer = new Atomizer({verbose: true});

    var self = this;

    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
            chunks.forEach(function(chunk) {
                chunk.files.forEach(function(file) {
                    if (file.match(JS_REGEX)) {
                        var source = compilation.assets[file];
                        self.foundClasses = self.foundClasses.concat(atomizer.findClassNames(source.source()));
                    }
                });
            });
            callback();
        });
    });

    compiler.plugin("emit", function(compilation, callback) {
        var finalConfig = atomizer.getConfig(self.foundClasses, self.configObject || {});
        var cssString = atomizer.getCss(finalConfig);

        compilation.assets[cssDestFile] = {
            source: function() {
                return cssString;
            },
            size: function() {
                return cssString.length;
            }
        };
        callback();
    });

};
