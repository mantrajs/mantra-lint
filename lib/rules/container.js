export const containerRules = {

  /**
   * Checks if the composer is exported
   * @param {Object} context - current context
   */
  exportComposer(context) {
    let nodes = context.ast.body;

    for (var i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      if (node.type === 'ExportNamedDeclaration') {
        if (node.declaration.declarations[0].id.name === 'composer') {
          return;
        }
      }
    }

    context.addViolation({
      message: 'a composer function should be exported from the module'
    });
  },

  /**
   * Checks if the composer is exported
   * @param {Object} context - current context
   */
  defaultExportContainer(context) {
    let nodes = context.ast.body;

    for (var i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      if (node.type === 'ExportDefaultDeclaration') {
        return;
      }
    }

    context.addViolation({
      message: 'a container should be exported by default'
    });
  },


  /**
  * Checks if the composer is exported
  * @param {Object} context - current context
  */
  exportMappers(context) {
    let code = context.code;

    // Check that mapper function is exported, if any
    let matched = code.match(/useDeps\((.+)\)/);
    if (matched) {
      let mapperName = matched[1];

      if (code.indexOf(`export const ${mapperName}`) === -1) {
        context.addViolation({
          message: `The mapper function ${mapperName} should be exported`
        });
      }
    }
  }
};
