import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import {expect} from 'chai';
import {prepareDummyApp, clearDummyApp} from './helpers';

import {
  lintDirStructure, lintNamingConvention, lintContainer, lintAppContext
} from '../lib/rules';

const dummyAppPath = path.resolve(__dirname, '../tmp/dummy');

describe("rules", function() {
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

  describe("containers", function() {
    it("passes if no violation is found", function() {
      prepareDummyApp({appPath: dummyAppPath});
      let containerPath = `${dummyAppPath}/client/modules/core/containers/post_list.js`;
      fse.copySync(__dirname + '/fixtures/container.tt', containerPath);
      let result = lintContainer(containerPath);
      expect(result.status).to.equal('passing');
    });

    it("fails if the composer is not exported", function() {
      let containerCode = fs.readFileSync(`${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let invalidCode = containerCode.replace('export const composer', 'const composer');
      let containerPath = `${dummyAppPath}/client/modules/core/containers/post_list.js`;
      fse.outputFileSync(containerPath, invalidCode);

      let result = lintContainer(containerPath);
      expect(result.status).to.equal('failing');
    });

    it("failes if the container is not exported by default", function() {
      let containerCode = fs.readFileSync(`${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let invalidCode = containerCode.replace('export default composeAll(', 'function composeAll(');
      let containerPath = `${dummyAppPath}/client/modules/core/containers/post_list.js`;
      fse.outputFileSync(containerPath, invalidCode);

      let result = lintContainer(containerPath);
      expect(result.status).to.equal('failing');
    });

    it("failes if a mapper is defined but not exported", function() {
      let invalidCode =
`import PostList from '../components/post_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
};

const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PostList);
`;
      let containerPath = `${dummyAppPath}/client/modules/core/containers/post_list.js`;
      fse.outputFileSync(containerPath, invalidCode);

      let result = lintContainer(containerPath);
      expect(result.status).to.equal('failing');
    });
  });

  describe("app_context", function() {
    it("passes if there is no violation", function() {
      let result = lintAppContext(__dirname + '/fixtures/context.tt');
      expect(result.status).to.equal('passing');
    });
  });
});
