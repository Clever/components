/**
 * transform-code-string is a babel plugin that sets the `code` property of
 * <Example> jsx elements to the code of its children as a string. If there is
 * an ancestor <ExampleCode> element, the code of that element is used instead.
 */

/**
 * getInnerCode returns the code inside the JSX element referred to by path.
 */
function getInnerCode(path) {
  var start = path.node.openingElement.end + 1;
  var end = path.node.closingElement.start;
  return path.hub.file.code.slice(start, end);
}

module.exports = function TransformCodeString(babel) {
  var t = babel.types;

  /**
   * exampleCodeRetriever looks for an <ExampleCode> element within path, and
   * sets `state.code` to the inner code if it finds one.
   */
  var exampleCodeRetriever = {
    JSXElement(path, state) {
      if (!t.isJSXIdentifier(path.node.openingElement.name, { name: "ExampleCode" })) {
        return;
      }
      if (t.isJSXIdentifier(path.node.openingElement.name, { name: "Example" })) {
        /*
         * If we encounter a nested <Example> element, stop the search. In
         * (contrived) cases like
         *   <Example>
         *     <Example>
         *       <ExampleCode>foo</ExampleCode>
         *     </Example>
         *   </Example>
         * we want the outer example's code to be everything, but the inner
         * example's code to be just "foo".
         */
        path.stop();
        return;
      }
      state.code = getInnerCode(path);
      path.stop();
    },
  };

  /**
   * hasCodeAttr returns true if the JSX element referred to by path has a
   * property named `code`.
   */
  function hasCodeAttr(path) {
    function isCodeAttr(a) {
      return t.isJSXIdentifier(a.name, { name: "code" });
    }
    return path.node.openingElement.attributes.some(isCodeAttr);
  }

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: {
      JSXElement(path) {
        if (!t.isJSXIdentifier(path.node.openingElement.name, { name: "Example" })) {
          return;
        }
        if (hasCodeAttr(path)) {
          // don't overwrite "code" property if it is set manually
          return;
        }

        var code;
        var s = {};
        path.traverse(exampleCodeRetriever, s);
        if (s.code) {
          code = s.code;
        } else {
          code = getInnerCode(path);
        }

        path.node.openingElement.attributes.push(
          t.jSXAttribute(t.jSXIdentifier("code"), t.jSXExpressionContainer(t.stringLiteral(code))),
        );
      },
    },
  };
};
