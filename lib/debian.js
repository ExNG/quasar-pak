// IMPORTS
const fs = require('fs')
const helper = require('./helper')
const path = require('path')
const shell = require('shelljs')

// VARS
var randomString = helper.rand() + '-deb'
var temp = path.join(path.sep, 'tmp', randomString)
temp = helper.mkdir(temp)

// EXPORT
module.exports = function (params) {
  // Check for params
  if (!params) throw String('Params not set')

  // Check for dist
  if (!params.hasOwnProperty('dist')) throw String('Dist not set')

  // Check for dest
  if (!params.hasOwnProperty('dest')) throw String('Dest not set')

  // Check for package
  if (!params.hasOwnProperty('package')) throw String('No package info provided')

  let keys = [
    'name',
    'productName',
    'version',
    'author',
    'description'
  ]

  for (let key of keys) {
    if (!params.package.hasOwnProperty(key)) throw String(`No ${key} in package`)
  }

  let binFolder = path.join(temp, 'usr', 'local', 'bin', params.package.name)
  let desktopFolder = path.join(temp, 'usr', 'share', 'applications')
  let DEBIAN = path.join(temp, 'DEBIAN')

  // Create folder architecture
  helper.mkpath(binFolder)
  helper.mkpath(desktopFolder)
  helper.mkpath(DEBIAN)

  // Copy binaries
  let dist = path.join(params.dist, params.package.productName + '-linux-x64')
  shell.cp(
    '-R',
    path.join(dist, '*'),
    binFolder
  )

  // Set control file
  let controlContent = [
    'Package: ' + params.package.name,
    'Version: ' + params.package.version,
    'Section: base',
    'Priority: optional',
    'Architecture: amd64',
    'Maintainer: ' + params.package.author,
    'Description: ' + params.package.description
  ].join('\n') + '\n'
  fs.writeFileSync(path.join(DEBIAN, 'control'), controlContent)

  // Set .desktop file
  var desktopentryContent = [
    '[Desktop Entry]',
    'Name=' + params.package.productName,
    'Exec=/usr/local/bin/' + params.package.name + '/' + params.package.productName,
    'Icon=/usr/local/bin/' + params.package.name + '/' + 'icon.png',
    'Type=Application',
    'Categories=GTK;GNOME;Utility;'
  ].join('\n') + '\n'
  let desktopFilePath = path.join(desktopFolder, params.package + '.desktop')
  fs.writeFileSync(desktopFilePath, desktopentryContent)

  // Create .deb file
  let debName = params.package.name + '_' + params.package.version + '_amd64.deb'
  let dest = path.join(helper.mkpath(params.dest), debName)
  let debBuildCommand = 'dpkg-deb --verbose --build ' + temp + ' ' + dest
  shell.exec(debBuildCommand)

  // return path to file
  return dest
}
