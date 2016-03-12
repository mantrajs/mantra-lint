import fs from 'fs';
import path from 'path';
import glob from 'glob';
import minimatch from 'minimatch';
import _ from 'lodash';

import {checkFileOrDirExists, prepareReport} from './utils';

export default function lintNamingConvention(appPath) {

  function validateFileNames(filePaths) {
    let violations = [];

    filePaths.forEach(function (filePath) {
      let fileName = path.basename(filePath);
      let fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      let violation = {};

      if (minimatch(filePath, `${appPath}/client/**/tests/**/*`)) {
        // test file

        let validRegex = /^([a-z]+[a-z0-9_]+)(\-[a-z]+[a-z0-9_]+)*$/;
        let matchingFilepath = fileNameWithoutExt.replace(/\-[a-z]+[a-z0-9_]+$/, '');

        if (! validRegex.test(fileNameWithoutExt)) {
          violation.path = filePath;
          violation.message = 'Invalid file name for a test file';
        }

        let matchedPath = filePath.replace(/tests\/.*$/, `${matchingFilepath}*`);
        if (! glob.sync(matchedPath).length) {
          violation.path = filePath;
          violation.message = 'No matching file for the test found in the source directory';
        }
      } else {
        // not a test file

        let validRegex = /^[a-z]+[a-z0-9_]+$/;

        if (! validRegex.test(fileNameWithoutExt)) {
          violation.path = filePath;
          violation.message = 'Invalid file name';
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

  return prepareReport({violations});
}
