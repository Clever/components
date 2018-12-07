import * as _ from "lodash";
import * as React from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {FormError, TextInput} from "src";

import "./FormErrorView.less";

const cssClass = {
  CONFIG_CONTAINER: "FormErrorView--configContainer",
  CONFIG_OPTIONS: "FormErrorView--configOptions",
  CONFIG: "FormErrorView--config",
  CONFIG_TOGGLE: "FormErrorView--configToggle",
  CONTAINER: "FormErrorView",
  INTRO: "FormErrorView--intro",
  PROPS: "FormErrorView--props",
};

export default class FormErrorView extends React.PureComponent {
  static cssClass = cssClass;

  state = {};

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="FormError"
        sourcePath="src/FormError/FormError.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>Convenience display component for simple form errors.</p>
          <CodeSample>
            {`
              import {FormError} from "clever-components";
              // OR
              import FormError from "clever-components/dist/FormError"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <b>Form Section</b>
            <FormError>Oops, you did it again!</FormError>
            <TextInput label="foo" name="form-element" onChange={_.noop} value="bar" />
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<FormError /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "FormError content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
