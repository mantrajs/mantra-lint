import {checkFileOrDirExists} from './utils';

export default function validator(paths) {
  let violations = [];

  paths.forEach(function (path) {
    if (! checkFileOrDirExists(path)) {
      violations.push({
        path: path
      });
    }
  });

  return violations;
};
