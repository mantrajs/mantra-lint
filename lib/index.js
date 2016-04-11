import Context from './context';

import {containerRules} from './rules';
import {checkAllRules} from './rules/utils';

function getRules(type) {
  let ruleMap = {
    container: containerRules
  };

  return ruleMap[type];
}

export default function lint(code, type) {
  let ctx = new Context(code);
  let rules = getRules(type);

  if (!rules) {
    console.log('No rules found for:', type);
    return;
  }

  checkAllRules(ctx, rules);

  return ctx.violations;
}
