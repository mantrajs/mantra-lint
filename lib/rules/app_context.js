const appContextRules = {
  defaultExportAppContext(context) {
    let nodes = context.ast.body;

    for (var i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      console.log(node);

      if (node.type === 'ExportDefaultDeclaration' &&
          node.declaration.type === 'FunctionExpression') {
        return;
      }
    }

    context.addViolation({
      message: 'application context should be exported by default'
    });
  }
};

export default appContextRules;
