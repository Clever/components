import classnames from "classnames";
import * as React from "react";

import Colors from "src/utils/Colors";
import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Logo, FlexBox, ItemAlign, Select } from "src";

import "./LogoView.less";

const cssClass = {
  CONFIG_CONTAINER: "LogoView--configContainer",
  CONFIG_OPTIONS: "LogoView--configOptions",
  CONFIG: "LogoView--config",
  CONFIG_TOGGLE: "LogoView--configToggle",
  CONTAINER: "LogoView",
  DEMO: "LogoView--demo",
  DROPDOWN_COLOR: "LogoView--dropdown--color",
  DROPDOWN_FONT_SIZE: "LogoView--dropdown--fontSize",
  INTRO: "LogoView--intro",
  PROPS: "LogoView--props",
};

export default class LogoView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    color: Colors.PRIMARY_BLUE,
    beta: false,
    fontSize: "2rem",
  };

  render() {
    const { beta, color, fontSize } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Logo" sourcePath="src/Logo/index.tsx">
        <header className={cssClass.INTRO}>
          <CodeSample>
            {`
              import {Logo} from "clever-components";
              // OR
              import Logo from "clever-components/dist/Logo"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <div className={cssClass.DEMO}>
            <ExampleCode>
              Hello world{" "}
              <Logo beta={beta} className="my--custom--class" color={color} style={{ fontSize }} />{" "}
              Sup
            </ExampleCode>
          </div>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { beta, color, fontSize } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_COLOR)}
            id={cssClass.DROPDOWN_COLOR}
            label="Color"
            name={cssClass.DROPDOWN_COLOR}
            onChange={({ value }) => this.setState({ color: value })}
            options={Object.keys(Colors)
              .sort()
              .map(key => ({
                label: key,
                value: Colors[key],
              }))}
            value={color}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <Select
            className={classnames(cssClass.CONFIG_OPTIONS, cssClass.DROPDOWN_FONT_SIZE)}
            id={cssClass.DROPDOWN_FONT_SIZE}
            label="Font Size"
            name={cssClass.DROPDOWN_FONT_SIZE}
            onChange={({ value }) => this.setState({ fontSize: value })}
            options={["0.5rem", "0.75rem", "1rem", "1.5rem", "2rem", "3rem", "4rem"].map(h => ({
              label: h,
              value: h,
            }))}
            value={fontSize}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={beta}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ beta: e.target.checked })}
          />{" "}
          Beta
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Logo /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "color",
            type: <code>utils.Colors</code>,
            description: "Color",
            optional: true,
            defaultValue: <code>utils.Colors.NEUTRAL_WHITE</code>,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
