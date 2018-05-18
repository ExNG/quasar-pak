// IMPORTS
const fs = require('fs')
const path = require('path')

module.exports = {
  /**
   * Create dir if not present.
   *
   * @param {String} dirPath
   * @return {String}
   */
  mkdir: function (dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }

    return dirPath
  },

  /**
   * Create all dirs in path.
   *
   * @param {String} dirPath
   * @return {String}
   */
  mkpath: function (dirPath) {
    let dirs = dirPath.split(path.sep)
    let progress = path.sep

    for (let dir of dirs) {
      progress += dir + path.sep

      this.mkdir(progress)
    }

    return progress
  },

  /**
   * Return random string of numbers.
   *
   * @return {String}
   */
  rand: function () {
    return String(parseInt(Math.random() * 1000000))
  }
}
