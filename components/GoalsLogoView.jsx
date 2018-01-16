import * as React from "react";
import classnames from "classnames";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {GoalsLogo, FlexBox, ItemAlign, SegmentedControl} from "src";

import "./GoalsLogoView.less";

const cssClass = {
  CONFIG_CONTAINER: "GoalsLogoView--configContainer",
  CONFIG_OPTIONS: "GoalsLogoView--configOptions",
  CONFIG: "GoalsLogoView--config",
  CONFIG_TOGGLE: "GoalsLogoView--configToggle",
  CONTAINER: "GoalsLogoView",
  INTRO: "GoalsLogoView--intro",
  LOGO_CONTAINER: "GoalsLogoView--logoContainer",
  LOGO_CONTAINER_WHITE: "GoalsLogoView--logoContainer--white",
  PROPS: "GoalsLogoView--props",
};

export default class GoalsLogoView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    size: GoalsLogo.defaultProps.size,
  };

  render() {
    const {size} = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="GoalsLogo"
        sourcePath="src/GoalsLogo/GoalsLogo.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>Brand logo for the Clever Goals product.</p>
          <CodeSample>
            {`
              import {GoalsLogo} from "clever-components";
              // OR
              import GoalsLogo from "clever-components/dist/GoalsLogo"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <div className={cssClass.LOGO_CONTAINER}>
            <ExampleCode>
              <GoalsLogo className="my--custom--class" size={size} />
            </ExampleCode>
          </div>
          {this._renderConfig()}
        </Example>

        <Example title="With Clever logo:">
          <div className={classnames(cssClass.LOGO_CONTAINER, cssClass.LOGO_CONTAINER_WHITE)}>
            <ExampleCode>
              <GoalsLogo className="my--custom--class" size={size} withClever />
            </ExampleCode>
          </div>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const {size} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({size: value})}
            options={[
              {content: "Small", value: "small"},
              {content: "Medium", value: "medium"},
              {content: "Large", value: "large"},
            ]}
            value={size}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<GoalsLogo /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "size",
            type: "GoalsLogo.Size",
            description: "Logo size",
            defaultValue: "GoalsLogo.Size.M",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
