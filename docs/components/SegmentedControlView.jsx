import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {SegmentedControl} from "src";


export default class SegmentedControlView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = SegmentedControlView;

    return (
      <View className={cssClass.CONTAINER} title="SegmentedControl">
        <Example
          title="Basic"
          code={`
            <SegmentedControl
              onSelect={(option) => console.log(\`Option \${option} selected\`)}
              options={[
                {
                  content: (
                    <span>
                      1 - HTML Content <span className="fa fa-question-circle" />
                    </span>
                  ),
                  value: "one",
                },
                {
                  content: "2 - Plain Text",
                  value: "two",
                },
                {
                  content: (
                    <span>
                      3 - HTML Content <span className="fa fa-spinner fa-spin" />
                    </span>
                  ),
                  value: "three",
                },
              ]}
            />
          `}
        >
          <SegmentedControl
            onSelect={(option) => console.log(`Option ${option} selected`)}
            options={[
              {
                content: (
                  <span>
                    1 - HTML Content <span className="fa fa-question-circle" />
                  </span>
                ),
                value: "one",
              },
              {
                content: "2 - Plain Text",
                value: "two",
              },
              {
                content: (
                  <span>
                    3 - HTML Content <span className="fa fa-spinner fa-spin" />
                  </span>
                ),
                value: "three",
              },
            ]}
          />
        </Example>
        <Example
          title="With Disabled Option"
          code={`
            <SegmentedControl
              defaultValue="two"
              onSelect={(option) => console.log(\`Option \${option} selected\`)}
              options={[
                {
                  content: "Option 1",
                  value: "one",
                },
                {
                  content: "2 - Default",
                  value: "two",
                },
                {
                  content: "3 - Option Disabled",
                  disabled: true,
                  value: "three",
                },
              ]}
            />
          `}
        >
          <SegmentedControl
            defaultValue="two"
            onSelect={(option) => console.log(`Option ${option} selected`)}
            options={[
              {
                content: "Option 1",
                value: "one",
              },
              {
                content: "2 - Default",
                value: "two",
              },
              {
                content: "3 - Option Disabled",
                disabled: true,
                value: "three",
              },
            ]}
          />
        </Example>
        <Example
          title="Control Disabled"
          code={`
            <SegmentedControl
              defaultValue="two"
              disabled
              onSelect={(option) => console.log(\`Option \${option} selected\`)}
              options={[
                {
                  content: "1 - Control Disabled",
                  value: "one",
                },
                {
                  content: "2 - Selected and Control Disabled",
                  value: "two",
                },
                {
                  content: "3 - Control Disabled",
                  value: "three",
                },
              ]}
            />
          `}
        >
          <SegmentedControl
            defaultValue="two"
            disabled
            onSelect={(option) => console.log(`Option ${option} selected`)}
            options={[
              {
                content: "1 - Control Disabled",
                value: "one",
              },
              {
                content: "2 - Selected and Control Disabled",
                value: "two",
              },
              {
                content: "3 - Control Disabled",
                value: "three",
              },
            ]}
          />
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanel",
              optional: true,
            },
            {
              name: "defaultValue",
              type: "String",
              description: "Key of the option as selected",
              defaultValue: "Null",
              optional: true,
            },
            {
              name: "disabled",
              type: "Boolean",
              description: "Whether the segmented control is disabled",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "onSelect",
              type: "Function",
              description: "Called with the key of selected item on select",
              optional: true,
            },
            {
              name: "options",
              type: "Object",
              description: "Array of objects with a value (unique ID), content (what to render), and disabled (optional)",
            },
          ]}
          className={cssClass.PROPS}
          title="InfoPanel"
        />
      </View>
    );
  }
}

SegmentedControlView.cssClass = {
  CONTAINER: "SegmentedControlView",
};
