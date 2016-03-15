const qsocks = require('qsocks');
const config = require('./utils').config;
const loadscript = require('./utils').loadscript();

function main() {
    this.global = null;
    this.app = null;
};

main.prototype.init = function() {

    var that = this;

    return qsocks.Connect(config)
        .then(function(global) {
            return that.global = global;
        })
        .then(function() {
            return that.global.createSessionApp().then(function(app) {
                return that.app = app;
            });
        })
        .then(function() {
            return that.app.addAlternateState('intro');
        })
        .then(function() {
            return that.app.setScript(loadscript).then(function() { that.app.doReload(); })
        });
};

main.prototype.setScript = function(script) {
    var that = this;
    return that.app.setScript(script).then(function() { that.app.doReload(); })
};

main.prototype.setDefaultScript = function() {
    var that = this;
    return that.app.setScript(loadscript).then(function() { that.app.doReload(); })
};

module.exports = main;