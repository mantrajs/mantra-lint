import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import {expect} from 'chai';

import Context from '../lib/context';
import {containerRules, appContextRules} from '../lib/rules';

describe("containerRules", function() {
  describe("exportComposer", function() {
    it("does not add a violation if there is no error", function() {
      let code = fs.readFileSync(
        `${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let ctx = new Context(code);

      containerRules.exportComposer(ctx);
      expect(ctx.violations).to.be.empty;
    });

    it("adds a violation if the composer is not exported", function() {
      let containerCode = fs.readFileSync(
        `${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let invalidCode = containerCode.replace('export const composer', 'const composer');
      let ctx = new Context(invalidCode);

      containerRules.exportComposer(ctx);
      expect(ctx.violations.length).to.equal(1);
    });
  });

  describe("exportMappers", function() {
    it("does not add a violation if no error", function() {
      let code = fs.readFileSync(
        `${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let ctx = new Context(code);

      containerRules.exportMappers(ctx);
      expect(ctx.violations).to.be.empty;
    });

    it("adds a violation if the mapper is defined but not exported", function() {
      let code = `
import PostList from '../components/post_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {posts});
  }
};

const depsMapper = ({}) => {}

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PostList);
`;
      let ctx = new Context(code);

      containerRules.exportMappers(ctx);
      expect(ctx.violations.length).to.equal(1);
    });
  });

  describe("defaultExportContainer", function() {
    it("handles no error", function() {
      let code = fs.readFileSync(
        `${__dirname}/fixtures/container.tt`, {encoding: 'utf-8'});
      let ctx = new Context(code);

      containerRules.defaultExportContainer(ctx);
      expect(ctx.violations).to.be.empty;
    });

    it("handles error", function() {
      let code = `
import PostList from '../components/post_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {

};
`;
      let ctx = new Context(code);

      containerRules.defaultExportContainer(ctx);
      expect(ctx.violations.length).to.equal(1);
    });
  });

});

describe("appContextRules", function() {
  describe("defaultExportAppContext", function() {
    it("handles no error", function() {
      let code = fs.readFileSync(
        `${__dirname}/fixtures/context.tt`, {encoding: 'utf-8'});
      let ctx = new Context(code);

      appContextRules.defaultExportAppContext(ctx);
      expect(ctx.violations).to.be.empty;
    });

    it("handles error", function() {
      let code = `
import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

function appContext() {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker
  };
}`;
      let ctx = new Context(code);

      appContextRules.defaultExportAppContext(ctx);
      expect(ctx.violations.length).to.equal(1);
    });
  });
});
