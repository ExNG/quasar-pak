// IMPORTS
const fs = require('fs')
const helper = require('./helper')
const path = require('path')
const shell = require('shelljs')

var temp = path.join(path.sep, 'tmp', randomString)
temp = helper.mkdir(temp)

// EXPORT
module.exports = function (params) {
  // Clear temp folder to be sure
  shell.exec(`rm -rf ${temp}/*`)

  
}
