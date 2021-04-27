import * as React from "react";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { CopyContainer, ExpandableContainer } from "src";

import "./ExpandableContainerView.less";

const cssClass = {
  INTRO: "ExpandableContainerView--intro",
  PROPS: "ExpandableContainerView--props",
  TITLE_TEXT: "ExpandableContainerView--titleText",
};

export default class ExpandableContainerView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    isExpanded: false,
  };

  render() {
    return (
      <View
        title="ExpandableContainer"
        sourcePath="src/ExpandableContainer/ExpandableContainer.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>ExpandableContainer is a container that can be toggled to hide/show its contents</p>
          <CodeSample>
            {`
              import {ExpandableContainer} from "clever-components";
              // OR
              import ExpandableContainer from "clever-components/dist/ExpandableContainer"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <ExpandableContainer
              className={"my--custom--class"}
              isExpanded={this.state.isExpanded}
              onToggleExpansion={() => this.setState({ isExpanded: !this.state.isExpanded })}
              title={
                <>
                  <FontAwesome name="address-card" />
                  <div className={cssClass.TITLE_TEXT}>
                    <p>Contact info</p>
                  </div>
                </>
              }
            >
              <CopyContainer>test@example.com</CopyContainer>
              <CopyContainer>123-456-7890</CopyContainer>
            </ExpandableContainer>
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<ExpandableContainer /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "ExpandableContainer content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "isExpanded",
            type: "boolean",
            description: "Whether or not to expand the container.",
          },
          {
            name: "onToggleExpansion",
            type: "Function",
            description: "Called when a user toggles the container",
          },
          {
            name: "title",
            type: "React.Node",
            description: "The ExpandableContainer title.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
