import {lintDirStructure, lintNamingConvention} from './rules';

/**
 * @typedef {Object} lintResult
 * @property {String} status - either 'passing' or 'failing'
 * @property {Object[]} violations - where and how the rules are violated
 * @property {Object[]} warnings - where and how the rules are overlooked in a
             manner that is not critical
 */

/**
 * @constructor
 * @param {String} appRoot - the path to the app root
 * @param {Object} options
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
