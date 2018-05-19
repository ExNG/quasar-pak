# Quasar-Pak

> Easily create linux installer from [Quasar](https://quasar-framework.org/) Electron apps

**DPKG is required for building debian packages**

* * *

## Debian

Run a node script with following code after quasar build.

```javascript
// <quasar app>/scripts/buildDebian.js
var pak = require('quasar-pak')
var path = require('path')

pak.debian({
  // All options, with a description, are in a table below
  package: require('../package.json'),
  dist: path.join(__dirname, '../dist/electron-ios/'),
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
| filename            | name of the deb file, _Add `.deb` to the filename by yourself_                         |
