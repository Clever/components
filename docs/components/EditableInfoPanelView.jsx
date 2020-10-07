import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Icon, EditableInfoPanel, FlexBox, FlexItem, ItemAlign, Modal, TextInput } from "src";

import "./EditableInfoPanelView.less";

const cssClass = {
  CONFIG_CONTAINER: "EditableInfoPanelView--configContainer",
  CONFIG_OPTIONS: "EditableInfoPanelView--configOptions",
  CONFIG: "EditableInfoPanelView--config",
  CONFIG_TOGGLE: "EditableInfoPanelView--configToggle",
  CONTAINER: "EditableInfoPanelView",
  INTRO: "EditableInfoPanelView--intro",
  PROPS: "EditableInfoPanelView--props",
  TITLE_TEXT: "EditableInfoPanelView--titleText",
};

export default class EditableInfoPanelView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    modalOpen: false,
    column1Content: "column 1 content",
    column2Content: "column 2 content",
    normalContent: "normal content",
  };

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="EditableInfoPanel"
        sourcePath="src/EditableInfoPanel/EditableInfoPanel.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            EditableInfoPanel is an extension of the InfoPanel component that allows for editing of
            panel content
          </p>
          <CodeSample>
            {`
              import {EditableInfoPanel} from "clever-components";
              // OR
              import EditableInfoPanel from "clever-components/dist/EditableInfoPanel"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <EditableInfoPanel
              className="my--custom--class"
              title={
                <FlexBox alignItems={ItemAlign.CENTER}>
                  <Icon size={Icon.sizes.MEDIUM} name={Icon.names.CHAT} />
                  <FlexItem className={cssClass.TITLE_TEXT}>
                    <p>Editable Info Panel Title</p>
                  </FlexItem>
                </FlexBox>
              }
              onClick={() => this.setState({ modalOpen: true })}
            >
              <div className="EditableInfoPanel--column">{this.state.column1Content}</div>
              <div className="EditableInfoPanel--column">{this.state.column2Content}</div>
              <div>{this.state.normalContent}</div>
            </EditableInfoPanel>
            {this.state.modalOpen && (
              <Modal title="Edit Content" closeModal={() => this.setState({ modalOpen: false })}>
                <TextInput
                  label="Column 1 Content"
                  placeholder={this.state.column1Content}
                  onChange={e => this.setState({ column1Content: e.target.value })}
                  value={this.state.column1Content}
                />
                <TextInput
                  label="Column 2 Content"
                  placeholder={this.state.column2Content}
                  onChange={e => this.setState({ column2Content: e.target.value })}
                  value={this.state.column2Content}
                />
                <TextInput
                  label="Normal Content"
                  placeholder={this.state.normalContent}
                  onChange={e => this.setState({ normalContent: e.target.value })}
                  value={this.state.normalContent}
                />
              </Modal>
            )}
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<EditableInfoPanel /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "EditableInfoPanel content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "onClick",
            type: "Function",
            description: "Called when a user clicks the edit button",
          },
          {
            name: "title",
            type: "node",
            description: "The EditableInfoPanel title",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
