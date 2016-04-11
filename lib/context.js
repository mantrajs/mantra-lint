import {parse} from 'acorn';

let Context = function (code) {
  this.code = code;
  this.ast = parse(code, {sourceType: 'module', location: true});
  this.violations = [];
};

Context.prototype.addViolation = function (violation) {
  this.violations.push(violation);
};

Context.prototype.report = function () {
  return this.violations;
};

export default Context;
