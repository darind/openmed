var fs = require('fs')
var _ = require('lodash')
var utils = require('./utils')
var crypto = require('crypto');

var options = { };

function low(file, opts) {
  options = _.assign({
    autosave: true,
    async: true
  }, opts)

  var obj = utils.getObject(file, low.parse)

  function db(key) {
    var array = obj[key] = obj[key] || []
    var chain = _.chain(array)

    if (file && options.autosave) {
      var save = function() {
        options.async ? db.save() : db.saveSync()
      }

      utils.composeAll(chain, function(arg) {
        save()
        return arg
      })

      save()
    }

    return chain
  }

  db.save = function(f) {
    f = f ? f : file
    utils.saveAsync(file, low.stringify(obj))
  }

  db.saveSync = function(f) {
    f = f ? f : file
    utils.saveSync(file, low.stringify(obj))
  }

  db.object = obj

  return db
}

low.mixin = function(arg) {
  _.mixin(arg)
}

low.stringify = function(obj) {
  if (options.algorithm && options.key) {
    var text = JSON.stringify(obj, null, 2);
    var cipher = crypto.createCipher(options.algorithm, options.key);
    var encrypted = Buffer.concat([cipher.update(new Buffer(text, 'utf8')), cipher.final()]);
    return encrypted;
  }

  return JSON.stringify(obj, null, 2)
}

low.parse = function(str) {
  if (options.algorithm && options.key) {
    var decipher = crypto.createDecipher(options.algorithm, options.key);
    var decryptedBuf = Buffer.concat([decipher.update(str), decipher.final()]);
    var decrypted = decryptedBuf.toString('utf8');
    return JSON.parse(decrypted);
  }

  return JSON.parse(str);
}

module.exports = low
