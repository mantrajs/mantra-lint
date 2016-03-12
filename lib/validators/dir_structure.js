import fs from 'fs';
import path from 'path';

import validator from './validator';

/**
 * Gets the names of all modules defined in the project
 * @param {String} appPath - path to the app
 * @return {Array} - a unique array of module names
 */
function getModuleNames(appPath) {
  let moduleDirPath = appPath + '/client/modules';

  return fs.readdirSync(moduleDirPath).filter(function (file) {
    return fs.statSync(path.resolve(moduleDirPath, file)).isDirectory();
  });
}

export function validateDirStructure(appPath) {
  let moduleNames = getModuleNames(appPath);
  let validatePath = [appPath + '/client/configs'];

  moduleNames.forEach(function (moduleName) {
    validatePath = validatePath.concat([
      appPath + `/client/modules/${moduleName}/index.js`,
      appPath + `/client/modules/${moduleName}/routes.jsx`,
      appPath + `/client/modules/${moduleName}/actions/tests`,
      appPath + `/client/modules/${moduleName}/actions/index.js`,
      appPath + `/client/modules/${moduleName}/components/tests`,
      appPath + `/client/modules/${moduleName}/configs`,
      appPath + `/client/modules/${moduleName}/containers/tests`
    ]);
  });

  let violations = validator(validatePath);

  return {
    status: violations.length ? 'failing' : 'successful',
    violations: violations
  };
}
