// IMPORTS
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

  shell.exec(`cp -r "${params.dist}" "${appdir}"`)

  let oldExecutable = path.join(params.dist, params.package.productName)
  let newExecutable = path.join(params.dist, 'AppRun')
  shell.exec(`mv "${oldExecutable}" "${newExecutable}"`)
  shell.exec(`chmod a+x "${newExecutable}"`)

  let oldIcon = path.join(params.dist, 'icon.png')
  let newIcon = path.join(params.dist, '.DirIcon')
  shell.exec(`mv "${oldIcon}" "${newIcon}"`)

  // Generate AppImage

  // AppDir cannot be a directory?
  let dest = path.join(params.dest, `${params.package.productName}.AppImage`)
  shell.exec([
    `cd "${__dirname}"`,
    'chmod a+x tool.AppImage',
    `./tool.AppImage -v -l "${appdir}" "${dest}"`
  ].join(' && '))
}
