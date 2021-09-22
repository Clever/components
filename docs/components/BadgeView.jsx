import * as React from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Badge } from "src";

import "./BadgeView.less";

const cssClass = {
  CONTAINER: "BadgeView",
  INTRO: "BadgeView--intro",
  PROPS: "BadgeView--props",
};

export default class BadgeView extends React.PureComponent {
  static cssClass = cssClass;

  render() {
    return (
      <View className={cssClass.CONTAINER} title="Badge" sourcePath="src/Badge/Badge.tsx">
        <header className={cssClass.INTRO}>
          <p>See examples of badge usage below:</p>
        </header>

        <Example title="Usage:">
          <ExampleCode>
            <h3>Displaying number of notifications</h3>
            <p>
              Notifications
              <Badge color="red" size="s" superscript>
                8
              </Badge>
            </p>
            <h3>Displaying step number</h3>
            <p>
              <Badge>1</Badge>
              Log in
            </p>
            <p>
              <Badge>2</Badge>
              Go to the Help Center
            </p>
            <h3>Superscript</h3>
            <p>
              I am badge superscript
              <Badge superscript>10</Badge>
            </p>
            <h3>Empty dot</h3>
            <Badge size="s" />
            <Badge />
            <Badge size="l" />
          </ExampleCode>
        </Example>

        <Example title="Colors:">
          <ExampleCode>
            <Badge color="red">red</Badge>
            <Badge color="blue">blue</Badge>
            <Badge color="gray">gray</Badge>
          </ExampleCode>
        </Example>

        <Example title="Size:">
          <ExampleCode>
            <Badge size="s">small</Badge>
            <Badge size="m">regular</Badge>
            <Badge size="l">large</Badge>
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "Badge content.",
            defaultValue: "Null",
            optional: "false",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            defaultValue: "Null",
            optional: true,
          },
          {
            name: "color",
            type: "Badge.Color",
            description: "Badge color",
            defaultValue: "Badge.Color.BLUE",
            optional: "true",
          },
          {
            name: "size",
            type: "Badge.Size",
            description: "Badge size",
            defaultValue: "Badge.Size.M",
            optional: true,
          },
          {
            name: "superscript",
            type: "boolean",
            description: "Displays the badge as a superscript",
            defaultValue: false,
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
