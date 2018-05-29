# Quasar-Pak

> Easily create linux installer from [Quasar](https://quasar-framework.org/) Electron apps

* * *

## Install

```bash
npm i -D quasar-pak
```

or if you want the bleeding edge: `npm i -D https://github.com/ExNG/quasar-pak.git`

## Debian

Run a node script with following code after quasar build.

**DPKG is required for building debian packages**

```javascript
// <quasar app>/scripts/buildDebian.js
var pak = require('quasar-pak')
var path = require('path')

pak.debian({
  // All options, with a description, are in a table below

  // Your package.json file, location of the the script assumes to be in a script folder
  package: require('../package.json'),

  // Dist is where your electron builds are located
  dist: path.join(__dirname, '../dist/electron-ios/'),

  // Dest is where the deb file will go, in this case "../dist/packagename_version_amd64.deb"
  dest: path.join(__dirname, '../dist')
})
```

| Value               | Description                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| package             | All data from `package.json`, necessary to get path for binaries and dekstop file name |
| dist                | Path to `dist/electron-<theme used, default: mat>` folder                              |
| distArch _Optional_ | Architecture of Quasar build. Default: "x64"                                           |
| dest                | Path to dir where deb file be located                                                  |
| debArch _Optional_  | Architecture of deb file. Default: "amd64"                                             |
| filename            | name of the deb file, _Dont forget to add `.deb` to the filename by yourself_          |

**App icon:** The .desktop file will link a icon.png as icon, make sure to copy it inside the build dir before building the .deb file. It should be located in the same dir as the executable.

The lib will then execute a shell command, with shelljs, called `dpkg-deb --build` which then generate the deb file. You will see the output in your shell.

## Example

I use Quasar-Pak for my own [electron app](https://github.com/ExNG/vuenote/) see my [build script here](https://github.com/ExNG/vuenote/blob/master/scripts/build-debian.js)

## Contribution

Code should be clean and documented. Code style doesn't matter as long as it is readable.

**Any pull requests are welcome!**

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Johann Behr
