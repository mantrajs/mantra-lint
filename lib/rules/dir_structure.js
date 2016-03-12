import fs from 'fs';

import {getModuleNames, validateExistence, prepareReport} from './utils';

export default function lintDirStructure(appPath) {
  let moduleNames = getModuleNames(appPath);
  let validatePaths = [
    appPath + '/client/configs',
    appPath + '/client/main.js'
  ];

  moduleNames.forEach(function (moduleName) {
    validatePaths = validatePaths.concat([
      appPath + `/client/modules/${moduleName}/index.js`,
      appPath + `/client/modules/${moduleName}/routes.jsx`,
      appPath + `/client/modules/${moduleName}/actions/tests`,
      appPath + `/client/modules/${moduleName}/actions/index.js`,
      appPath + `/client/modules/${moduleName}/components/tests`,
      appPath + `/client/modules/${moduleName}/configs`,
      appPath + `/client/modules/${moduleName}/containers/tests`
    ]);
  });

  let violations = validateExistence(validatePaths);

  return prepareReport({violations});
}
