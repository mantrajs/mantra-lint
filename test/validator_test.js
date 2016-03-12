import path from 'path';
import fse from 'fs-extra';
import {expect} from 'chai';
import {prepareDummyApp, clearDummyApp} from './helpers';

import {
  validateDirStructure, validateNamingConvention
} from '../lib/validators';

const dummyAppPath = path.resolve(__dirname, '../tmp/dummy');

describe("validators", function() {
  afterEach(function() {
    clearDummyApp(dummyAppPath);
  });

  describe("directory_structure", function() {
    it("returns successful status if violation is not found", function() {
      prepareDummyApp({appPath: dummyAppPath});
      let result = validateDirStructure(dummyAppPath);
      expect(result.status).to.equal('successful');
    });

    it("returns failing status if violation is found", function() {
      prepareDummyApp({appPath: dummyAppPath, except: ['/client/configs']});
      let result = validateDirStructure(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("checks multiple modules", function() {
      prepareDummyApp({
        appPath: dummyAppPath,
        modules: ['core', 'comment'],
        except: ['/client/modules/comment/actions']
      });
      let result = validateDirStructure(dummyAppPath);
      expect(result.status).to.equal('failing');
    });
  });

  describe("naming_convention", function() {
    it("returns successful status if no validation is found", function() {
      prepareDummyApp({appPath: dummyAppPath});
      let result = validateNamingConvention(dummyAppPath);
      expect(result.status).to.equal('successful');
    });

    it("returns failing status if a filename includes a dash", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/main-header.js`);
      let result = validateNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns failing status if a filename includes a dot", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/main.layout.js`);
      let result = validateNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns failing status if there is no matching filename for a test filename", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/comment_list.js`);
      let result = validateNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns successful status if there is a matching filename for a test filename", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/comment_list.js`);
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/comment_list.js`);
      let result = validateNamingConvention(dummyAppPath);
      expect(result.status).to.equal('successful');
    });
  });
});
