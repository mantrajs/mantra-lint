import {lintDirStructure, lintNamingConvention} from './rules';

/**
 * @typedef {Object} lintResult
 * @property {String} status - either 'passing' or 'failing'
 * @property {Object[]} violations - where and how violations occurred
 */

/**
 * @constructor
 */
let Linter = function (appRoot, options) {
  this.appRoot = appRoot;
  this.options = options;
};

/**
 * Checks the directory strcuture against the Mantra spec
 * @return {lintResult}
 */
Linter.prototype.lintDirStructure = function () {
  return lintDirStructure(this.appRoot);
};

/**
 * Checks the file names against naming convention
 * @return {lintResult}
 */
Linter.prototype.lintNamingConvention = function () {
  return lintNamingConvention(this.appRoot);
};

export default Linter;
