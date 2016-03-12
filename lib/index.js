import {validateDirStructure} from './validators';

let Optimizer = function (appRoot, options) {
  this.appRoot = appRoot;
  this.options = options;
};

/**
 * Checks the directory strcuture against the Mantra spec
 * @return {Object} result
 * @return {String} result.status - the result of validation
 * @return {Object[]} result.violations - files responsible for violations
 */
Optimizer.prototype.validateDirStructure = function () {
  return validateDirStructure(this.appRoot);
};

Optimizer.prototype.validateNamingConvention = function () {
  
};

export default Optimizer;
