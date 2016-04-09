import fs from 'fs';
import path from 'path';

/**
 * Gets the names of all modules defined in the project
 * @param {String} appPath - path to the app
 * @return {Array} - a unique array of module names
 */
export function getModuleNames(appPath) {
  let moduleDirPath = appPath + '/client/modules';

  return fs.readdirSync(moduleDirPath).filter(function (file) {
    return fs.statSync(path.resolve(moduleDirPath, file)).isDirectory();
  });
}

/**
 * Validates the existence of the given paths.
 * @param {Array} paths - an array of paths to be validated for existence
 * @return {Object[]} violations
 * @return {String} violations.path - the path to the file that failed the
 *         validation.
 */
export function validateExistence(paths) {
  let violations = [];

  paths.forEach(function (filePath) {
    if (!checkFileOrDirExists(filePath)) {
      violations.push({
        filePath,
        message: 'Missing file'
      });
    }
  });

  return violations;
}

/**
 * Checks if a file or directory exists at the given path
 * @param {String} targetPath - the path to the file or directory. Can be either
 *        absolute or relative.
 * @return {Boolean} - true if the file or directory exists. Otherwise false.
 */
export function checkFileOrDirExists(targetPath) {
  try {
    fs.lstatSync(targetPath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }

  return true;
}

/**
 * Prepares the report to be returned by Linter, given the violations
 * @params {Object[]} params.violations
 */
export function prepareReport(violations) {
  return {
    status: violations.length ? 'failing' : 'passing',
    violations
  };
}
