import fs from 'fs';
import path from 'path';
import glob from 'glob';
import minimatch from 'minimatch';
import _ from 'lodash';

import {checkFileOrDirExists} from './utils';

export default function lintNamingConvention(appPath) {

  function validateFileNames(filePaths) {
    let validRegex = /^[a-z]+[a-z0-9_]+$/;
    let violations = [];

    filePaths.forEach(function (filePath) {
      let fileName = path.basename(filePath);
      let fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      let violation = {};

      // Check against the general rule
      if (! validRegex.test(fileNameWithoutExt)) {
        violation.path = filePath;
      }

      // For a test file, check if an identical filename exists in the source
      if (minimatch(filePath, `${appPath}/client/**/tests/**/*`)) {
        let matchedPath = filePath.replace(/tests\/.*$/, `${fileNameWithoutExt}*`);
        if (! glob.sync(matchedPath).length) {
          violation.path = filePath;
        }
      }

      if (! _.isEmpty(violation)) {
        violations.push(violation);
      }
    });

    return violations;
  };

  let filePaths = glob.sync(`${appPath}/client/**/*`);
  let violations = validateFileNames(filePaths);

  return {
    status: violations.length ? 'failing' : 'passing',
    violations: violations
  };
}
