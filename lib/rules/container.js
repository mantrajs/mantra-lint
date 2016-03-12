import fs from 'fs';

import {prepareReport} from './utils';

export default function lintContainer(containerPath) {

  let containerCode = fs.readFileSync(containerPath, {encoding: 'utf-8'});
  let messages = [];

  // Check that container is exported as default
  if (containerCode.indexOf('export default composeAll(') === -1) {
    messages.push('No default export of container found');
  }

  // Check that composer function is exported
  if (containerCode.indexOf('export const composer') === -1) {
    messages.push('A composer function should be exported');
  }

  // Check that mapper function is exported, if any
  let matched = containerCode.match(/useDeps\((.+)\)/);
  if (matched) {
    let mapperName = matched[1];

    if (containerCode.indexOf(`export const ${mapperName}`) === -1) {
      messages.push(`The mapper function ${mapperName} should be exported`);
    }
  }

  let violations = messages.length ? [{ path: containerPath, messages: messages }] : [];
  return prepareReport(violations);
}
