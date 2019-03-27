import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Switch, FlexBox, ItemAlign } from "src";

import "./SwitchView.less";

const cssClass = {
  CONFIG_CONTAINER: "SwitchView--configContainer",
  CONFIG_OPTIONS: "SwitchView--configOptions",
  CONFIG: "SwitchView--config",
  CONFIG_TOGGLE: "SwitchView--configToggle",
  CONTAINER: "SwitchView",
  INTRO: "SwitchView--intro",
  PROPS: "SwitchView--props",
};

export default class SwitchView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    checked: false,
    disabled: false,
  };

  render() {
    const { checked, disabled } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Switch" sourcePath="src/Switch/Switch.tsx">
        <header className={cssClass.INTRO}>
          <p>Switch toggles a single setting on or off with an immediate effect.</p>
          <p>
            Common useses are for preferences, settings, or features which may be enabled or
            disabled with switches.
          </p>
          <CodeSample>
            {`
              import {Switch} from "clever-components";
              // OR
              import Switch from "clever-components/dist/Switch"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Switch
              className="my--custom--class"
              checked={checked}
              disabled={disabled}
              onChange={this._handleChange}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _handleChange = checked => {
    this.setState({ checked });
  };

  _renderConfig() {
    const { checked, disabled } = this.state;
    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={checked}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ checked: e.target.checked })}
          />{" "}
          Checked
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={disabled}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ disabled: e.target.checked })}
          />{" "}
          Disabled
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Switch /> Props"
        availableProps={[
          {
            name: "ariaLabel",
            type: "string",
            description: "aria-label attribute",
            optional: true,
          },
          {
            name: "ariaLabelledby",
            type: "string",
            description: "aria-labelledby attribute",
            optional: true,
          },
          {
            name: "checked",
            type: "bool",
            description: "Controls the switches checked state",
            optional: false,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "disabled",
            type: "bool",
            description: "Controls the switches disabled state",
            defaultValue: "False",
            optional: true,
          },
          {
            name: "onChange",
            type: "Function",
            description: "Handler function called when the switch is toggled",
            optional: false,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
