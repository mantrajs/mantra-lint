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

  paths.forEach(function (path) {
    if (! checkFileOrDirExists(path)) {
      violations.push({
        path: path,
        message: 'Missing file'
      });
    }
  });

  return violations;
}

/**
 * Checks if a file or directory exists at the given path
 * @param {String} path - the path to the file or directory. Can be either
 *        absolute or relative.
 * @return {Boolean} - true if the file or directory exists. Otherwise false.
 */
export function checkFileOrDirExists(path) {
  try {
    fs.lstatSync(path);
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }

  return true;
}
