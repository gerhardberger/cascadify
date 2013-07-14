"use strict"

var test = require('tape')

var concat = require('concat-stream')
var fs = require('fs')

var cascadify = require('../')()

test('bundling circular dependencies css files', function(t) {
  t.plan(1)
  cascadify.add(__dirname + '/circular/index.js')
  cascadify.bundle().pipe(concat(function(data) {
    var aCSS = fs.readFileSync(__dirname + '/node_modules/circular-a/style.css', 'utf8')
    var bCSS = fs.readFileSync(__dirname + '/node_modules/circular-b/style.css', 'utf8')
    t.equal(data, bCSS + aCSS)
  }))
})


