import path from 'path';
import {expect} from 'chai';
import {prepareDummyApp, clearDummyApp} from './helpers';

import {validateDirStructure} from '../lib/validators/dir_structure';

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
});
