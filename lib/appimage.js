// IMPORTS
const fs = require('fs')
const helper = require('./helper')
const path = require('path')
const shell = require('shelljs')

// EXPORT
module.exports = function (params) {
  if (!params.package) throw new Error('No package given.')
  if (!params.dist) throw new Error('No dist given.')
  params.dist = path.join(params.dist, `${params.package.productName}-linux-x64`)
  if (!params.dest) throw new Error('No dest given.')

  // Generate AppDir
  let appdir = path.join(path.sep, 'tmp', helper.rand() + '-appdir')
  appdir = helper.mkdir(appdir)

  shell.exec(`cp -r "${params.dist}"/* "${appdir}"`)

  // Create AppRun
  fs.writeFileSync(path.join(appdir, 'AppRun'), [
    '#!/bin/sh',
    '',
    'cd "$(dirname "$0")"',
    `exec "./${params.package.productName}"`
  ].join('\n'))
  // make AppRun executable
  shell.exec(`chmod a+x "${path.join(appdir, 'AppRun')}"`)

  // Create .desktop file
  fs.writeFileSync(path.join(appdir, `${params.package.name}.desktop`), [
    '[Desktop Entry]',
    'Type=Application',
    `Name=${params.package.name}`,
    'Icon=icon'
  ].join('\n'))

  // Make app executable
  shell.exec([
    `cd ${appdir}`,
    `chmod a+x "${params.package.productName}"`
  ].join(' && '))

  // Generate AppImage
  let dest = path.join(params.dest, `${params.package.productName}.AppImage`)
  shell.exec([
    `cd "${__dirname}"`,
    'chmod a+x tool.AppImage',
    `./tool.AppImage "${appdir}" "${dest}"`
  ].join(' && '))
}
