import path from 'path';
import fse from 'fs-extra';
import {expect} from 'chai';
import {prepareDummyApp, clearDummyApp} from './helpers';

import {
  lintDirStructure, lintNamingConvention
} from '../lib/rules';

const dummyAppPath = path.resolve(__dirname, '../tmp/dummy');

describe("validators", function() {
  afterEach(function() {
    clearDummyApp(dummyAppPath);
  });

  describe("directory_structure", function() {
    it("returns passing status if violation is not found", function() {
      prepareDummyApp({appPath: dummyAppPath});
      let result = lintDirStructure(dummyAppPath);
      expect(result.status).to.equal('passing');
    });

    it("returns failing status if violation is found", function() {
      prepareDummyApp({appPath: dummyAppPath, except: ['/client/configs']});
      let result = lintDirStructure(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("checks multiple modules", function() {
      prepareDummyApp({
        appPath: dummyAppPath,
        modules: ['core', 'comment'],
        except: ['/client/modules/comment/actions']
      });
      let result = lintDirStructure(dummyAppPath);
      expect(result.status).to.equal('failing');
    });
  });

  describe("naming_convention", function() {
    it("returns passing status if no validation is found", function() {
      prepareDummyApp({appPath: dummyAppPath});
      let result = lintNamingConvention(dummyAppPath);
      expect(result.status).to.equal('passing');
    });

    it("returns failing status if a filename includes a dash", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/main-header.js`);
      let result = lintNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns failing status if a filename includes a dot", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/main.layout.js`);
      let result = lintNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns failing status if there is no matching filename for a test filename", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/comment_list.js`);
      let result = lintNamingConvention(dummyAppPath);
      expect(result.status).to.equal('failing');
    });

    it("returns passing status if there is a matching filename for a test filename", function() {
      prepareDummyApp({appPath: dummyAppPath});
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/tests/comment_list.js`);
      fse.outputFileSync(`${dummyAppPath}/client/modules/core/containers/comment_list.js`);
      let result = lintNamingConvention(dummyAppPath);
      expect(result.status).to.equal('passing');
    });
  });
});
