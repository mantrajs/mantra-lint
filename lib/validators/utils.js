import fs from 'fs';

/**
 * Checks if a file or directory exists at the given path
 * @param path {String} - the path to the file or directory. Can be either
 *        absolute or relative.
 * @return Boolean - true if the file or directory exists. Otherwise false.
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
