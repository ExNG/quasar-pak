// IMPORTS
const helper = require('../lib/helper')
const pak = require('../src/pak.js')
const path = require('path')
const shell = require('shelljs')

var bTemp = path.join(path.sep, 'tmp', helper.rand() + '-boilerplate')
bTemp = helper.mkdir(bTemp)

var appimageTemp = path.join(path.sep, 'tmp', helper.rand() + '-appimage')
appimageTemp = helper.mkdir(appimageTemp)

module.exports = [
  () => {
    // Clear temp folder to be sure
    // shell.exec(`rm -rf ${temp}/*`)

    // Clone boilerplate
    shell.exec([
      `cd ${bTemp}`,
      `git clone https://github.com/ExNG/quasar-boilerplate.git . --depth 1`
    ].join(' && '))

    pak.appimage({
      package: require(`${bTemp}/package.json`),
      dist: `${bTemp}/dist/electron-mat/`,
      dest: appimageTemp
    })

    console.log('appimageTemp', appimageTemp)
  }
]
