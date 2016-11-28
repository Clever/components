import React, {Component} from "react";

import Example from "./Example";
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
      </View>
    );
  }
}

SegmentedControlView.cssClass = {
  CONTAINER: "SegmentedControlView",
};
