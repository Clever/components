import _ from "lodash";
import React, { PureComponent } from "react";

import PropDocumentation from "./PropDocumentation";
import Example from "./Example";
import View from "./View";
import { Icon, SegmentedControl } from "src";

import "./IconView.less";

export default class IconView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { size: Icon.sizes.MEDIUM };
  }

  render() {
    const { cssClass } = IconView;

    return (
      <View className={cssClass.CONTAINER} title="Icon" sourcePath="src/Icon/Icon.tsx">
        <p>
          This component gives you access to a library of over 60 bespoke icons designed
          specifically for Clever products. Each icon comes in three sizes.
        </p>

        <Example
          code={`
            <Icon size={Icon.sizes.MEDIUM} name={Icon.names.BLOCKS} />
          `}
        >
          <SegmentedControl
            onSelect={(s) => this.setState({ size: s })}
            options={[
              { content: "Small", value: Icon.sizes.SMALL },
              { content: "Medium (default)", value: Icon.sizes.MEDIUM },
              { content: "Large", value: Icon.sizes.LARGE },
            ]}
            value={this.state.size}
          />
          <ul>
            {_.map(Icon.names, (name) => (
              <li key={name}>
                <Icon size={this.state.size} name={name} />
                <label>{name}</label>
              </li>
            ))}
          </ul>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the icon",
              optional: true,
            },
            {
              name: "name",
              type: "String",
              description: "The name of the icon to use",
            },
            {
              name: "type",
              type: "String",
              description: "One of small, medium, large",
              defaultValue: "medium",
            },
          ]}
          className={cssClass.PROPS}
          title="Icon"
        />
      </View>
    );
  }
}

IconView.cssClass = {
  CONTAINER: "IconView",
};
