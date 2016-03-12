import fs from 'fs';

import {prepareReport} from './utils';

export default function lintAppContext(appContextPath) {

  let content = fs.readFileSync(appContextPath, {encoding: 'utf-8'});
  let messages = [];

  // Check that app context is exported as default
  if (content.indexOf('export default function') === -1) {
    messages.push('No default export of application context found');
  }

  if (content.indexOf("import {Meteor} from 'meteor/meteor';") === -1) {
    messages.push('Missing import statement for Meteor');
  }

  let violations = messages.length ? [{ path: containerPath, messages: messages }] : [];
  return prepareReport(violations);
}
