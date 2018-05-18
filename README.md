# Quasar-Pak

> Easily create linux installer from [Quasar](https://quasar-framework.org/) Electron apps

**DPKG is required for building debian packages**

* * *

## Debian

Run a node script with following code after quasar build

```javascript
// <quasar app>/scripts/buildDebian.js
var pak = require('./quasar-pak/src/pak.js')
var path = require('path')

pak.debian({
  // All options, with a description, are in a table below
  package: require('../package.json'),
  dist: path.join(__dirname, '../dist/electron-ios/'),
  dest: path.join(__dirname, '../dist')
})
```

| Value   | Description                                                                            |
| ------- | -------------------------------------------------------------------------------------- |
| package | All data from `package.json`, necessary to get path for binaries and dekstop file name |
| dist    | Path to `dist/electron-<theme used, default: mat>` folder                              |
| dest    | Path to dir where deb file be located                                                  |
