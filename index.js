/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-getowner-polyfill',
  included: function() {
    this._ensureThisImport();
    this.import('vendor/install-getowner-polyfill.js');
  },
  _ensureThisImport: function() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        var current = this;
        var app;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        var app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
